// Storage API
chrome.storage.sync.set({ name: "Pranto" }, function () {
  console.log("Value is set");
});

chrome.storage.sync.get("name", function (result) {
  console.log("Value currently is " + result.name);
});
