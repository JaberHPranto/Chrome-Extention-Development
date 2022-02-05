console.log("background running");
chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab) {
  let msg = {
    text: "Hello from background",
    author: "Pranto",
  };
  chrome.tabs.sendMessage(tab.id, msg);
}
