const express = require("express");

const {
  uploadResume,
  getResumeHistory,
  deleteResume,
  getResumeById,
  downloadResume,
  interviewQuestions,
} = require("../controllers/resume.controller");

const verifyJWT = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post(
  "/upload",
  verifyJWT,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/history",
  verifyJWT,
  getResumeHistory
);

router.get(
  "/download/:id",
  verifyJWT,
  downloadResume
);

router.get(
  "/:id",
  verifyJWT,
  getResumeById
);

router.delete("/:id", verifyJWT, deleteResume);

router.get(
  "/interview/:id",
  verifyJWT,
  interviewQuestions,
);

module.exports = router;