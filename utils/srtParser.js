export function parseSRT(data) {
  const entries = [];
  const blocks = data.split("\n\n");

  for (let block of blocks) {
    const lines = block.split("\n");
    if (lines.length >= 3) {
      entries.push({
        id: lines[0],
        time: lines[1],
        text: lines.slice(2).join(" ")
      });
    }
  }

  return entries;
}

export function buildSRT(entries) {
  return entries.map(e => `${e.id}\n${e.time}\n${e.text}\n`).join("\n");
}