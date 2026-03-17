// utils/srtParser.js

// 🔹 SRT parse function
export function parseSRT(srtText) {
  const entries = [];
  
  const blocks = srtText.split("\n\n");

  for (let block of blocks) {
    const lines = block.split("\n");

    if (lines.length >= 3) {
      const index = lines[0];
      const time = lines[1];
      const text = lines.slice(2).join(" ");

      entries.push({
        index,
        time,
        text
      });
    }
  }

  return entries;
}


// 🔹 Rebuild SRT function
export function buildSRT(entries) {
  return entries.map(entry => {
    return `${entry.index}\n${entry.time}\n${entry.text}\n`;
  }).join("\n");
}