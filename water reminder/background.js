console.log("hello from background");

let defaultDuration = 1.0;

function createAlarm(params) {
  chrome.alarms.create("drink water", { delayInMinutes: defaultDuration });
}

chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log(alarm);
  chrome.notifications.create(
    `water-reminder-${Date.now()}`,
    {
      type: "basic",
      iconUrl: chrome.runtime.getURL("./icons/32.png"),
      title: "Drink Water",
      message: "Time for drinking a glass of water 🥳",
    },
    function (notificationId) {
      console.log("displaying notification", notificationId);
    }
  );
});

createAlarm();

// receiving data from content page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Event received in background");
  defaultDuration = request.minutes * 1.0; // to make it double
  createAlarm(); // it will not create another alarm, just gonna update the previous alarm as both has same name
  sendResponse({ success: "message received" });
});
