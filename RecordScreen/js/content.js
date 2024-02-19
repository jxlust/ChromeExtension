console.log("我是注入的脚本");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("接收到background消息：", request);
  switch (request.data) {
    case "start-record":
      startRecord();
      break;
  }
});
async function startRecord() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
  });
  console.log(stream);
  const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=h264")
    ? "video/webm;codecs=h264"
    : "video/webm";
  const mediaRecorder = new MediaRecorder(stream, { mimeType });
  const chunks = [];
  mediaRecorder.addEventListener("dataavailable", (e) => {
    chunks.push(e.data);
  });
  mediaRecorder.addEventListener("stop", () => {
    const blob = new Blob(chunks, { type: chunks[0].type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video.webm";
    a.click();
  });
  mediaRecorder.start();
}
