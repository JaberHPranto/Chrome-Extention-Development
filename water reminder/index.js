const btn = document.getElementById("add");
const input = document.getElementById("num");
// add event listener
btn.addEventListener("click", remind);

// grab value from button
function remind() {
  const minutes = input.value;

  // sending minutes data to background script
  chrome.runtime.sendMessage({ minutes }, function (response) {
    console.log(response);
  });
}

// create an alarm for that value
