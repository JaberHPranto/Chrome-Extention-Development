// wrapping everything in jQuery function -> works like iife
$(function () {
  function padWithZero(num) {
    return num < 10 ? "0" + num : num;
  }
  function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const timeText = `${padWithZero(hours)}:${padWithZero(
      minutes
    )}:${padWithZero(seconds)}`;
    $("#time").text(timeText);
  }

  setInterval(getTime, 1000);
});
