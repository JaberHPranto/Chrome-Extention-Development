// document.write("Your not allowed to view the website");

// we would allow to watch on a particular day
const day = new Date().getDay();
if (day === 0) {
  alert("Website Unlocked 🏆");
} else document.write("Your not allowed to view the website 🔒");
