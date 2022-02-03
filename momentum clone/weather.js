$(function () {
  function getLocation(callback) {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    function onSuccess(position) {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      callback(latitude, longitude); // this is asynchronous, so we need a callback fn to pass the value
    }

    function onError() {
      alert("Unable to get location");
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  getLocation(getWeatherData);

  function getWeatherData(lat, long) {
    const domain = `https://api.openweathermap.org/data/2.5/onecall`;
    const apiKey = `c2f90a8e060cf9d5b4a27887f9984422`;

    const api = `${domain}?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        const temperature = data.current.temp;
        const weatherIcon = data.current.weather[0].icon;
        const imageUrl = `http://openweathermap.org/img/wn`;

        $("#weather").text(`${temperature} °C`);
        $("#weather-icon").attr("src", `${imageUrl}/${weatherIcon}.png`);
      });
  }
});
