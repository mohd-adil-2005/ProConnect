import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 8080;
import  postroutes  from "./routes/postroute.js";
import userroutes from "./routes/userroute.js";
import path from "path";
app.use("/uploads", express.static("uploads"));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Db has connected");

}


const allowedOrigins = [
  "https://proconnect-sandy.vercel.app", // ✅ remove trailing slash
    "https://proconnect-git-main-mohd-adil-2005s-projects.vercel.app",
    "https://proconnect-bvb9uscyu-mohd-adil-2005s-projects.vercel.app",
     "http://localhost:3000"                // for local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],    // allow these headers
  credentials: true  
 
}));






app.use(express.json());

app.use(postroutes);
app.use(userroutes);
main().catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! Linkedin project ');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

