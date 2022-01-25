const input = document.getElementById("nameInput");

input.addEventListener("keyup", onChange);
function onChange() {
  const text = input.value;
  document.getElementById("text").innerText = text.toUpperCase();
}
