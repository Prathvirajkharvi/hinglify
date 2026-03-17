async function convert() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const file = document.getElementById("fileInput").files[0];
  const loader = document.getElementById("loader");

  if (!apiKey || !file) {
    alert("API key aur file dalo!");
    return;
  }

  loader.style.display = "block";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("apiKey", apiKey);

  const res = await fetch("/convert", {
    method: "POST",
    body: formData
  });

  const blob = await res.blob();

  loader.style.display = "none";

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hinglish.srt";
  a.click();
}