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
app.use(cors({
  origin: "http://localhost:3000",
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

