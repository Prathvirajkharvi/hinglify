// server.js

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import convertRoute from "./routes/convert.js";

const app = express();
const PORT = process.env.PORT || 10000;

// dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/convert", convertRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Hinglify running on port ${PORT}`);
});