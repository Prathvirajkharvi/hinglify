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
      return res.status(400).send("Missing data");
    }

    const srtText = file.buffer.toString("utf-8");
    const entries = parseSRT(srtText);

    for (let entry of entries) {
      entry.text = await convertText(apiKey, entry.text);
    }

    const newSRT = buildSRT(entries);

    res.setHeader("Content-Disposition", "attachment; filename=hinglish.srt");
    res.send(newSRT);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

export default router;