async function convert() {
  const apiKey = document.getElementById("apiKey").value;
  const apiType = document.getElementById("apiType").value;
  const fileInput = document.getElementById("fileInput").files[0];
  const loader = document.getElementById("loader");

  if (!apiKey || !fileInput) {
    alert("API key aur file dalo!");
    return;
  }

  loader.style.display = "block";

  const formData = new FormData();
  formData.append("file", fileInput);
  formData.append("apiKey", apiKey);
  formData.append("apiType", apiType);

  const res = await fetch("/convert", {
    method: "POST",
    body: formData
  });

  const blob = await res.blob();

  loader.style.display = "none";

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "hinglish_subtitles.srt";
  link.click();
}