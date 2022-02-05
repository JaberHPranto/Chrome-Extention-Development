let contextMenuItem = {
  id: "spendMoney",
  title: "Spend %s to budgety 💸",
  contexts: ["selection"],
};

function isInt(value) {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10))
  );
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickedData) {
  if (clickedData.menuItemId === "spendMoney" && clickedData.selectionText) {
    if (isInt(clickedData.selectionText)) {
      chrome.storage.sync.get(["total", "limit"], function (budget) {
        let newTotal = 0;
        if (budget.total) {
          newTotal += budget.total;
        }

        newTotal += parseInt(clickedData.selectionText);

        chrome.storage.sync.set({ total: newTotal }, function () {
          if (newTotal > budget.limit) {
            const notifyObj = {
              type: "basic",
              iconUrl: chrome.runtime.getURL("./icons/32.png"),
              title: "⚠️ Limit Reached !! ",
              message: "Uh 😢, Looks like you've reached your credit limit",
            };

            chrome.notifications.create("LimitNotify", notifyObj);
          }
        });
      });
    }
  }
});

// show badges
chrome.storage.onChanged.addListener(function (changes, _areaName) {
  chrome.browserAction.setBadgeText({
    text: changes.total.newValue.toString(),
  });
});
