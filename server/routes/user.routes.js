const express = require("express");

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/user.controller");

const verifyJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/current-user", verifyJWT, getCurrentUser);

module.exports = router;