import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import convertRoute from "./routes/convert.js";

const app = express();
const PORT = process.env.PORT || 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/convert", convertRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});