const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const { extractTextFromPDF } = require("../services/pdf.service");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3 = require("../config/s3");
const Resume = require("../models/Resume");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { analyzeResume} = require("../services/gemini.service");
const{generateInterviewQuestions}=require("../services/gemini.service");
const mongoose = require("mongoose");

// const getResumeById = asyncHandler(async (req, res) => {

//   const resume = await Resume.findOne({
//     _id: req.params.id,
//     user: req.user._id,
//   });

//   if (!resume) {
//     throw new ApiError(404, "Resume not found");
//   }

//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       resume,
//       "Resume fetched successfully"
//     )
//   );
// });

const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please upload a resume");
  }

  const fileKey = `${uuidv4()}-${req.file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  });


  await s3.send(command);
  const resumeText = await extractTextFromPDF(req.file.buffer);

  const aiAnalysis = JSON.parse(await analyzeResume(resumeText));

console.log(aiAnalysis);

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

  console.log("Logged in User ID:", req.user._id);

 const resume = await Resume.create({
  user: req.user._id,
  fileName: fileKey,
  fileUrl,
  fileSize: req.file.size,
  resumeText,

  atsScore: aiAnalysis.atsScore,
  strengths: aiAnalysis.strengths,
  weaknesses: aiAnalysis.weaknesses,
  missingSkills: aiAnalysis.missingSkills,
  suggestions: aiAnalysis.suggestions,
});

console.log("Saved Resume:", resume);

  return res.status(201).json(
    new ApiResponse(
      201,
      resume,
      "Resume uploaded successfully"
    )
  );
});

//  const getResumeHistory = asyncHandler(async (req, res) => {
//   const resumes = await Resume.find({
//     user: req.user._id,
//   })
//     .sort({ createdAt: -1 })
//     .select(
//       "fileName atsScore createdAt strengths weaknesses suggestions"
//     );

//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       resumes,
//       "Resume history fetched successfully"
//     )
//   );
// });

const getResumeHistory = asyncHandler(async (req, res) => {

  console.log("History User:", req.user._id);

  const resumes = await Resume.find({
    user: req.user._id,
  })
    .sort({ createdAt: -1 })
    .select(
      "fileName atsScore createdAt strengths weaknesses missingSkills suggestions"
    );

  console.log("Found:", resumes);

  return res.status(200).json(
    new ApiResponse(
      200,
      resumes,
      "Resume history fetched successfully"
    )
  );
});

const getResumeById = asyncHandler(async (req, res) => {

  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      resume,
      "Resume fetched successfully"
    )
  );
});

const deleteResume = asyncHandler(async (req, res) => {

  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: resume.fileName,
  });

  await s3.send(command);

  await Resume.findByIdAndDelete(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Resume deleted successfully"
    )
  );

});

const downloadResume = asyncHandler(async (req, res) => {
  
  console.log("DOWNLOAD API HIT");

  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        fileUrl: resume.fileUrl,
      },
      "Resume download link fetched successfully"
    )
  );

});

const interviewQuestions = asyncHandler(async (req, res) => {

  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  let aiResponse = await generateInterviewQuestions(resume.resumeText);

  aiResponse = aiResponse
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const data = JSON.parse(aiResponse);

  return res.status(200).json(
    new ApiResponse(
      200,
      data,
      "Interview Questions Generated"
    )
  );

});

module.exports = {
  uploadResume,
  getResumeHistory,
  getResumeById,
  deleteResume,
  downloadResume,
  interviewQuestions,
};