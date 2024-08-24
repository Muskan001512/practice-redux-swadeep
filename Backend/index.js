import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import privateRoute from "./router.js";
import authentication from "./middleware/auth.js";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";

// Obtain __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL;
const JWTKEY = process.env.JWTKEY || "sanCHAY";
app.use(express.json());
app.use(fileUpload());
console.log(dbUrl, "dbUrl");
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, function () {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log("Errorrrrrrrrrrrrrrrrrrr", err, err.message));
app.post("/login", (req, res) => {
  console.log("object");
  JWT.sign(req.body, JWTKEY, { expiresIn: "2h" }, (err, token) => {
    if (err) res.send(err);
    else res.send(token);
  });
});
app.post("/upload", authentication, (req, res) => {
  console.log(req.files);
  console.log("req.files");
  if (!req.files || !req.files.file) {
    return res.status(400).send("No files were uploaded.");
  }
  console.log(__dirname, "__dirname");
  const file = req.files.file;
  const loki = req.files.loki;
  console.log(loki, "loki");
  console.log(file, "file");
  const uploadPath = path.join(
    __dirname,
    "uploads",
    Date.now() + file.name + path.extname(file.name)
  );
  // const uploadPathw = path.join(__dirname, 'uploads', Date.now() + loki.name + path.extname(loki.name));
  console.log(uploadPath, "uploadPath");
  // console.log(uploadPathw, "uploadPathw")
  // Create the uploads directory if it doesn't exist
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }

  // Use the mv() method to place the file in the upload directory
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    // res.send(`File uploaded successfully: ${path.basename(uploadPath)}`);
  });
  loki.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    // res.send(`File uploaded successfully: ${path.basename(uploadPath)}`);
  });
  res.send("Loki ki loki bhot badi hai...!");
});
// app.use(authentication)
app.use("/private", privateRoute);
