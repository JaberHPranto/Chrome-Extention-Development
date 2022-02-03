$(function () {
  function printTasks() {
    getFromStorage(function (tasks) {
      $("#tasks").empty();
      let str = "";
      for (let task of tasks) {
        str = `${str}
          <li class=${task.done ? "complete" : "incomplete"} >
          <input ${task.done ? "checked" : ""} type="checkbox" class="done" />
          ${task.name}
          <button class="delete" > ✖️ </button>
          </li>`;
      }
      $("#tasks").append(str);
    });
  }

  // local storage
  function getFromStorage(callback) {
    chrome.storage.sync.get(["tasks"], function (result) {
      if (result && result.tasks) {
        callback(result.tasks);
      } else callback([]);
    });
  }

  function saveToStorage(tasks, cb) {
    chrome.storage.sync.set({ tasks }, function () {
      printTasks();
    });
  }

  // Click activity
  $(document).on("click", ".done", function () {
    const self = this; // as ref got changes in another function
    getFromStorage(function (tasks) {
      tasks[$(self).parent().index()].done =
        !tasks[$(self).parent().index()].done;

      saveToStorage(tasks, printTasks);
    });
  });

  $(document).on("click", ".delete", function () {
    const self = this; // as ref got changes in another function
    getFromStorage(function (tasks) {
      const index = $(self).parent().index();
      tasks.splice(index, 1);
      saveToStorage(tasks, printTasks);
    });
  });

  $("#addTask").on("click", function () {
    const value = $("#newTask").val();
    getFromStorage(function (tasks) {
      tasks.push({
        name: value,
        done: false,
      });

      saveToStorage(tasks, printTasks);
    });
  });

  $("#todo").on("click", function () {
    $("#card").fadeToggle();
  });

  // initial call
  printTasks();
});
