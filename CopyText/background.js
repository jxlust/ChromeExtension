function setContentEditable() {
  document.body.contentEditable = true;
  document.body.style.background = 'skyblue'
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setContentEditable,
  });
});
