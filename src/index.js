function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector(".degrees");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector(".description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector(".dateAndTime");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = "b1332ot408bf42fec23dfc7ca30a0576";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=b1332ot408bf42fec23dfc7ca30a0576&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".degrees");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrentheitElement = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrentheitElement);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".degrees");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function getPosition(GeolocationPosition) {
  console.log(GeolocationPosition);
  let lat = GeolocationPosition.coords.latitude;
  let lon = GeolocationPosition.coords.longitude;
  let apiKey = "b1332ot408bf42fec23dfc7ca30a0576";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=b1332ot408bf42fec23dfc7ca30a0576$units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function showWeather(response) {
  let showTemp = Math.round(response.data.temperature.current);

  let displayTemp = document.querySelector(".degrees");
  displayTemp.innerHTML = showTemp;

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.city;

  let descr = document.querySelector(".description");
  descr.innerHTML = response.data.condition.description;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-input");
form.addEventListener("submit", handleSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let getCurrentLocation = document.querySelector("#current-button");
getCurrentLocation.addEventListener("click", currentLocation);

search("Durban");
