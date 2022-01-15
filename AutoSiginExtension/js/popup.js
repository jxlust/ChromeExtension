const alinkElement = document.getElementById("jxlust");
alinkElement.addEventListener("click", function () {
  chrome.tabs.create(
    {
      url: "https://github.com/jxlust",
      active: true,
    }
  )
},true)

chrome.storage.sync.get("color", ({ color }) => {
  alinkElement.style.backgroundColor = color;
});
const number = document.getElementById('number');
chrome.storage.sync.get("startSigin",({startSigin}) => {
  number.innerText = startSigin
})