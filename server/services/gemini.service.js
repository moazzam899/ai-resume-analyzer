const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeResume = async (resumeText) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content:
          "You are an expert ATS Resume Reviewer. Return ONLY valid JSON.",
      },
      {
        role: "user",
        content: `
You are an expert ATS (Applicant Tracking System) Resume Reviewer.

Analyze the resume like a professional recruiter.

Rules:
- atsScore must be an INTEGER between 0 and 100.
- Do NOT give very low scores unless the resume is genuinely poor.
- For a resume with good technical skills, projects, and experience, ATS score should generally be between 70 and 90.
- Return ONLY valid JSON.
- Do not include markdown or explanations.

Return exactly:

{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:

${resumeText}
`
      },
    ],

    temperature: 0.3,

    response_format: {
      type: "json_object",
    },
  });

  return completion.choices[0].message.content;
};

// const generateInterviewQuestions = async (resumeText) => {

// const prompt = `
// Based on this resume generate:

// 10 HR Questions

// 10 Technical Questions

// 5 Project Questions

// Return JSON only.

// Resume:

// ${resumeText}
// `;

// const result = await model.generateContent(prompt);

// return result.response.text();

// };

const generateInterviewQuestions = async (resumeText) => {

  const prompt = `
You are an interview expert.

Based on this resume generate:

- 10 HR Questions
- 10 Technical Questions
- 5 Project Questions

Return ONLY valid JSON.

Format:

{
  "hrQuestions": [],
  "technicalQuestions": [],
  "projectQuestions": []
}

Do not use markdown.
Do not use \`\`\`json.
Return JSON only.

Resume:

${resumeText}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: "Return ONLY valid JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ],

    temperature: 0.2,

    response_format: {
      type: "json_object",
    },
  });

  return completion.choices[0].message.content;
};

module.exports = {
  analyzeResume,
  generateInterviewQuestions,
};
