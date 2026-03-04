import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
import  postroutes  from "./routes/postroute.js";
import userroutes from "./routes/userroute.js";
import path from "path";
app.use("/uploads", express.static("uploads"));

const allowedOrigins = [
  "https://proconnect-sandy.vercel.app",
  "https://proconnect-git-main-mohd-adil-2005s-projects.vercel.app",
  "https://proconnect-bvb9uscyu-mohd-adil-2005s-projects.vercel.app",
  "http://localhost:3000",
];

// Allow extra origins from env (e.g. new Vercel preview URLs)
const extraOrigins = (process.env.CORS_ORIGINS || "").split(",").map((o) => o.trim()).filter(Boolean);
const origins = [...allowedOrigins, ...extraOrigins];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // same-origin or tools like Postman
    if (origins.includes(origin)) return callback(null, true);
    // In production, you can set CORS_ORIGINS or add your frontend URL above
    console.warn("CORS blocked origin:", origin);
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));



app.use(express.json());

app.use(postroutes);
app.use(userroutes);

app.get("/", (req, res) => {
  res.send("Hello World! Pro Connect API");
});

async function start() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not set in environment");
    }
    // Longer timeouts for cloud (e.g. Render → Atlas); avoid buffering timeout on first request
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 20000,
    });
    console.log("Db has connected");
    app.listen(port, () => {
      console.log("Server listening on port " + port);
    });
  } catch (err) {
    console.error("Startup error:", err.message);
    process.exit(1);
  }
}

start();

