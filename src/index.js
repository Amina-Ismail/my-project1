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

  getForecast(response.data.coordinates);
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

function showWeather(response) {
  let showTemp = Math.round(response.data.main.temp);
  console.log(showTemp);
  console.log(response);

  let displayTemp = document.querySelector(".degrees");
  displayTemp.innerHTML = showTemp;

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let descr = document.querySelector(".description");
  descr.innerHTML = response.data.weather[0].main;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=c03face7caa58a9b7ffa9f52b7238a93&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                  <div class="card-text">
                    <div class="firstTemp">
                      <strong class="maxTemp">${Math.round(
                        forecastDay.temp.max
                      )}</strong>°/<span class="minTemp"
                        >${Math.round(forecastDay.temp.min)}°</span>
                    </div>
                    <div class="firstIcon"><img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"></div>
                    <div class="temp-desc">${
                      forecastDay.weather[0].description
                    }</div>
                  </div>
                </div>
              </div>
              </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let getCurrentLocButton = document.querySelector("#current-button");
getCurrentLocButton.addEventListener("click", getCurrentLoc);

let celsiusTemperature = null;

let form = document.querySelector("#search-input");
form.addEventListener("submit", handleSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Durban");
