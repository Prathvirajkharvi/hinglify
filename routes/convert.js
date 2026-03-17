// routes/convert.js

import express from "express";
import multer from "multer";
import { parseSRT, buildSRT } from "../utils/srtParser.js";
import { convertText } from "../services/aiService.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

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

    const srtText = file.buffer.toString("utf-8");
    const entries = parseSRT(srtText);

    // 🔥 Convert each line
    for (let entry of entries) {
      try {
        entry.text = await convertText(apiType, apiKey, entry.text);
      } catch (err) {
        console.error("Convert error:", err.message);
      }
    }

    // 🔥 Rebuild SRT
    const newSRT = buildSRT(entries);

    // 🔥 Send file
    res.setHeader("Content-Disposition", "attachment; filename=hinglish.srt");
    res.setHeader("Content-Type", "text/plain");

    res.send(newSRT);

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Conversion failed" });
  }
});

export default router;