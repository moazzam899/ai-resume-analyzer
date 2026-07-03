const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const verifyJWT = asyncHandler(async (req, res, next) => {
  // Header se token lo

  console.log("Authorization Header:",req.headers.authorization);
  const token = req.header("Authorization")?.replace("Bearer ", "");



  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  // Token verify karo
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  // User database se nikalo
  const user = await User.findById(decodedToken.id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid Token");
  }

  // User ko request me attach kar do
  req.user = user;

  next();
});

module.exports = verifyJWT;