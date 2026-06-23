const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },
    resumeText: {
    type: String,
    default: "",
    },

    atsScore: {
  type: Number,
},

strengths: [
  {
    type: String,
  },
],

weaknesses: [
  {
    type: String,
  },
],

missingSkills: [
  {
    type: String,
  },
],

suggestions: [
  {
    type: String,
  },
],

  },
  {
    timestamps: true,
  }

  
);

module.exports = mongoose.model("Resume", resumeSchema);