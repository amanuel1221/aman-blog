const express=require("express");
const jwt=require("jsonwebtoken");

const cors=require("cors");
require("dotenv").config();

const app=express();

app.use(express.json());

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running on aman-blog platform",
  });
});

module.exports = app;