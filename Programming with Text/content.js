console.log("Here we go ");

// change html p tag color to sky-blue
let paragraphs = document.getElementsByTagName("p");

for (let el of paragraphs) {
  el.style["backgroundColor"] = "skyblue";
}

// getting message from background script
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  console.log(message.text);
}
