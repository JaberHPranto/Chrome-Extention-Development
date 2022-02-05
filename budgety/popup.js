$(function () {
  // when we open the popup, update total and limit in ui
  chrome.storage.sync.get(["total", "limit"], function (budget) {
    if (budget.total) {
      $("#total").text(budget.total);
    }
    if (budget.limit) {
      $("#limit").text(budget.limit);
    }
  });

  // tracking activity

  $("#spendAmount").click(function () {
    // getting already stored value
    chrome.storage.sync.get(["total", "limit"], function (budget) {
      let newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      // getting user's input value
      let inputAmount = $("#amount").val();
      if (inputAmount) newTotal += parseInt(inputAmount);

      // save to chrome storage
      chrome.storage.sync.set({ total: newTotal }, function () {
        // checking user limit
        if (inputAmount && newTotal > budget.limit) {
          // show notification
          const notifyObj = {
            type: "basic",
            iconUrl: chrome.runtime.getURL("./icons/32.png"),
            title: "⚠️ Limit Reached !! ",
            message: "Uh 😢, Looks like you've reached your credit limit",
          };

          chrome.notifications.create("LimitNotify", notifyObj);
        }
      });

      // update ui
      $("#total").text(newTotal);
      $("#amount").val("");
    });
  });
});
