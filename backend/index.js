import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

// files

import connectDB from "./config/db.js";

import userRoutes from "./routes/UserRoutes.js";
import genreRoutes from "./routes/GenreRoutes.js";
import moviesRoutes from "./routes/MovieRoutes.js";
import uploadRoutes from "./routes/UploadRoutes.js";

// configurations

dotenv.config(); // to load environment variables from .env file into process.env

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://mern-movies-database-frontend-fj5gf8388.vercel.app",
  })
);

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 3000;

// routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);

app.use("/api/v1/movies", moviesRoutes);

app.use("/api/v1/upload", uploadRoutes);

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const __dirname = path.resolve(); // Node.js method that resolves the full path of the current module file

// console.log(__dirname);

const location = path.join(__dirname + "/uploads");
// console.log(location);
// express.static() is Express middleware to serve static files such as images, CSS files, and JavaScript files.

// configuring Express to serve static files located in the "uploads" directory at the "/uploads" URL path
app.use("/uploads", express.static(location));

app.listen(port, () => console.log(`Listening to Server : ${port}`));

// *********************************User_Register Verification**********************************
// C:\Users\devil\Desktop\moviesDB\backend\uploads\image-1712327789181.jpg
// // const express = require("express");
// // const mongoose = require("mongoose");
// import mongoose from "mongoose";
// // const nodemailer = require("nodemailer");
// import nodemailer from "nodemailer";
// // const { v4: uuidv4 } = require("uuid");
// import { v4 as uuidv4 } from "uuid";

// // Initialize Express app
// // const app = express();

// // Initialize MongoDB connection

// // {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   }
// mongoose.connect(process.env.MONGO_URI);
// const db = mongoose.connection;

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: { type: String, unique: true },
//   password: String,
//   verificationCode: String,
//   isVerified: { type: Boolean, default: false },
// });

// const User = mongoose.model("User", userSchema);

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   //   host: "smtp.gmail.com",
//   //   port: 587,
//   //   secure: false,

//   auth: {
//     user: process.env.APP_EMAIL,
//     pass: process.env.APP_PASS,
//   },
// });

// // Register endpoint
// app.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Generate verification code
//     const verificationCode = uuidv4();

//     // Save user to database with verification code
//     const user = new User({ username, email, password, verificationCode });
//     await user.save();

//     // Send verification email
//     await transporter.sendMail({
//       from: "aasamsivasankarreddynani143@gmail.com",
//       to: email,
//       subject: "Verify your email",
//       text: `Your verification code is: ${verificationCode}`,
//     });

//     res.status(200).send("Verification code sent to your email.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });

// // Verify endpoint
// app.post("/verify", async (req, res) => {
//   try {
//     const { email, verificationCode } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });

//     // Check if user exists and verification code matches
//     if (!user || user.verificationCode !== verificationCode) {
//       res.status(400).send("Invalid verification code.");
//       return;
//     }

//     // Update user as verified
//     user.isVerified = true;
//     await user.save();

//     res.status(200).send("Email verified successfully.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
