$(function () {
  // already stored value
  chrome.storage.sync.get("limit", function (budget) {
    if (budget.limit) {
      $("#limit").val(budget.limit);
    }
  });

  $("#saveLimit").click(function () {
    let limit = $("#limit").val();
    if (parseInt(limit)) {
      chrome.storage.sync.set({ limit }, function () {
        close();
      });
    }
  });

  $("#resetTotal").click(function () {
    chrome.storage.sync.set({ total: 0 });
  });
});
