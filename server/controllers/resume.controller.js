const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const { extractTextFromPDF } = require("../services/pdf.service");

const s3 = require("../config/s3");
const Resume = require("../models/Resume");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { analyzeResume } = require("../services/gemini.service");

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

  return res.status(201).json(
    new ApiResponse(
      201,
      resume,
      "Resume uploaded successfully"
    )
  );
});

module.exports = {
  uploadResume,
};