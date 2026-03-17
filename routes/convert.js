// routes/convert.js

import express from "express";
import multer from "multer";
import { parseSRT, buildSRT } from "../utils/srtParser.js";
import { convertText } from "../services/aiService.js";

const router = express.Router();

// 🔥 Memory storage (NO FILE SAVE)
const upload = multer({ storage: multer.memoryStorage() });

// POST /convert
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const { apiKey, apiType } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!apiKey || !apiType) {
      return res.status(400).json({ error: "Missing API key or type" });
    }

    // 🔹 Convert buffer to text
    const srtText = file.buffer.toString("utf-8");

    // 🔹 Parse SRT
    const entries = parseSRT(srtText);

    // 🔥 Convert each subtitle line
    for (let entry of entries) {
  try {
    entry.text = await convertText(apiType, apiKey, entry.text);
  } catch (err) {
    console.error("Convert error:", err.message);
    entry.text = entry.text; // fallback
  }
}

    // 🔹 Rebuild SRT
    const outputSRT = buildSRT(entries);

    // 🔹 Send as download
    res.setHeader("Content-Disposition", "attachment; filename=hinglish_subtitles.srt");
    res.setHeader("Content-Type", "text/plain");

    return res.send(outputSRT);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Conversion failed" });
  }
});

export default router;