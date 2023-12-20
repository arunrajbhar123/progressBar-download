const progressBar = document.querySelector("#progressBar");
const percentage = document.querySelector(".percentage");
const handleDownload = async () => {
  const url =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const res = await fetch(url);

  if (!res.ok) return console.log("failed api call");
  const totalLength = Number(res.headers.get("Content-Length"));
  const reader = res.body.getReader();
  const chucks = [];
  let receivedLength = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      console.log("downloaded");
      break;
    }
    chucks.push(value);
    receivedLength = receivedLength + value.length;
    if (typeof totalLength === "number") {
      const step = (receivedLength / totalLength) * 100;
      progressBar.value = step;
      const roundedString = Math.floor(step);
      percentage.innerHTML = roundedString + "%";
      console.log(roundedString);
    }
  }
  const blob = new Blob(chucks);
  const urls = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = urls;
  a.download = "demo.mp4";
  a.click();
};
