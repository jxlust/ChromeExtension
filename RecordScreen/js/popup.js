async function fectImgData(url, fileName, zip) {
  const response = await fetch(url, {
    mode: "no-cors", // no-cors, *cors, same-origin
  });
  const blob = await response.blob();
  zip.file(fileName, blob, {
    base64: true,
  });
  return true;
}

async function batGsapImg() {
  const zip = new JSZip();
  const list = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22,
    23,
  ];
  const allP = [];
  for (let i of list) {
    const url = `https://gsap.com/img/Flair-${i}.png`;
    const imgName = `Flair-${i}.png`;
    allP.push(fectImgData(url, imgName, zip));
  }
  let cur = 0;
  for (let p of allP) {
    await p;
    cur++;
  }
  if (cur === list.length) {
    console.log("ok.");
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "gsap-img.zip");
  }
}

window.onload = () => {
  const btn1 = document.querySelector("#btn1");
  btn1.addEventListener("click", async () => {
    const [tabs] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    console.log("tabs", tabs);
    const response = await chrome.tabs.sendMessage(tabs.id, {
      data: "start-record",
    });
    console.log("res:", response);
  });

  const counterInput = document.getElementById("counterInput");
  let counterNumber = 0;
  const counterEl = document.getElementById("counter");
  const timerEl = document.getElementById("timer");

  counterInput.addEventListener("input", (e) => {
    const value = e.target.value;
    const number =
      value
        .replace(/[^\d.]+/g, "")
        .replace(/^0+(\d)/, "$1")
        .replace(/^\./, "0.")
        .match(/^\d*(\.?\d{0,})/g)?.[0] || "";
    e.target.value = number;
    updateTimerView(number);
  });

  counterInput.addEventListener("blur", () => {
    // const number = counterInput.value || 0;
    // timerEl.innerText = parseTime(number);
  });

  counterEl.addEventListener("click", () => {
    const number = counterInput.value || 0;
    if (number > 0) {
      // 开始倒计时
      startTimeDown(number);
    }
  });

  function updateTimerView(number) {
    if (number && number > 0) {
      timerEl.innerText = parseTime(number);
    } else {
      timerEl.innerText = "00:00:00";
    }
  }

  function startTimeDown(number) {
    let rafId = null;
    let startTime = 0;
    const myAnimationDown = (delay) => {
      console.log(delay);
      if (startTime <= 0) {
        startTime = delay;
      }
      const diff = ((delay - startTime) / 1000) | 0;
      console.log("diff:", diff);
      updateTimerView(number - diff);
      if (diff <= number) {
        // 小于
        rafId = window.requestAnimationFrame(myAnimationDown);
      } else {
        // 结束
        window.cancelAnimationFrame(rafId);
      }
    };

    rafId = window.requestAnimationFrame(myAnimationDown);
  }

  function parseTime(seconds) {
    if (!seconds) {
      return "00:00:00";
    }
    let ss = parseInt(seconds); // 秒
    let mm = 0; // 分
    let hh = 0; // 小时

    if (ss > 60) {
      mm = parseInt(ss / 60);
      ss = parseInt(ss % 60);
    }
    if (mm > 60) {
      hh = parseInt(mm / 60);
      mm = parseInt(mm % 60);
    }
    let result = "";
    // HH:MM:SS
    const HH = `${hh}`.padStart(2, "0");
    const MM = `${mm}`.padStart(2, "0");
    const SS = `${ss}`.padStart(2, "0");
    return `${HH}:${MM}:${SS}`;
  }

  document.getElementById("dnBtn").addEventListener("click", () => {
    batGsapImg();
  });
};
