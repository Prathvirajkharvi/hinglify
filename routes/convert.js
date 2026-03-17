import express from "express";
import multer from "multer";
import { parseSRT, buildSRT } from "../utils/srtParser.js";
import { convertText } from "../services/aiService.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const { apiKey } = req.body;

    if (!file || !apiKey) {
      return res.status(400).send("Missing file or API key");
    }

    const srtText = file.buffer.toString("utf-8");
    const entries = parseSRT(srtText);

    for (let entry of entries) {
      try {
        entry.text = await convertText(apiKey, entry.text);

        // 🔥 delay (VERY IMPORTANT)
        await new Promise(r => setTimeout(r, 300));

      } catch (err) {
        console.error("Line error:", err.message);
      }
    }

    const newSRT = buildSRT(entries);

    res.setHeader("Content-Disposition", "attachment; filename=hinglish.srt");
    res.send(newSRT);

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Internal error");
  }
});

export default router;