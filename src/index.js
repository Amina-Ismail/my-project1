let change = document.querySelector(".para-date");
let now = new Date();
let dates = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
change.innerHTML = `${dates} ${month} ${year}`;

function getPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longtitude = position.coords.longitude;

  let apiKey = "c03face7caa58a9b7ffa9f52b7238a93";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let getCurrentLocButton = document.querySelector("#current-Button");
getCurrentLocButton.addEventListener("click", getCurrentLoc);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "c03face7caa58a9b7ffa9f52b7238a93";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let showTemp = Math.round(response.data.main.temp);
  console.log(showTemp);
  console.log(response);

  let displayTemp = document.querySelector(".degrees");
  displayTemp.innerHTML = showTemp;

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;

  let descr = document.querySelector(".description");
  descr.innerHTML = response.data.weather[0].main;
}

let form = document.querySelector("#search-input");
form.addEventListener("submit", search);
