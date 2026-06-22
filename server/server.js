const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("AI Resume Analyzer Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});