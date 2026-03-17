// server.js

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import convertRoute from "./routes/convert.js";

const app = express();
const PORT = process.env.PORT || 5000;

// 🔹 Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Routes
app.use("/convert", convertRoute);

// 🔹 Default route (homepage)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`🚀 Hinglify running on http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("🔥 Unhandled Rejection:", err);
});