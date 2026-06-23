const express = require("express");
const { uploadResume } = require("../controllers/resume.controller");
const verifyJWT = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

// Upload Resume
router.post(
  "/upload",
  verifyJWT,
  upload.single("resume"),
  uploadResume
);

module.exports = router;