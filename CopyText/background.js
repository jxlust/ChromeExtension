function setContentEditable() {
  document.body.contentEditable = true;
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setContentEditable,
  });
});
