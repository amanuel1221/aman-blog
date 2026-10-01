const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/authRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

const googleAuthRoutes = require("./routes/googleAuthRoutes");
const googleSignInRoutes = require("./routes/googleSignInRoutes.js"); // Google Sign-In
const imageRoutes = require("./routes/imageRoutes.js");



app.use(express.json());

app.use(cookieParser());

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use("/auth", authRoutes);
app.use("/auth", googleSignInRoutes);

app.use("/posts", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", contactRoutes);
app.use("/api/images", imageRoutes);

app.use("/api/admin", adminRoutes);
app.use("/auth", googleAuthRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    hint: "Check /posts to get all posts",
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});






module.exports = app;