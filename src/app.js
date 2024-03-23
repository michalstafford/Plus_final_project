/** @format */
function refreshWeather(response) {
  console.log(response.data.temperature.current);

  let temperatureElement = document.querySelector("#current-temp-value");
  let cityElement = document.querySelector(".weather-app-city");
  let descriptionElement = document.querySelector(
    "#current-weather-conditions"
  );
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed"); // Make sure this is defined at the correct place
  let dateTimeElement = document.querySelector("#current-date-time");
  let temperature = response.data.temperature.current; // Ensure this is declared before used
  let iconElement = document.querySelector("#icon");

  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="Weather Icon" class ="current-temp-icon">`; // Ensure alt attribute is included for accessibility

  let now = new Date();
  let dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    now
  );
  let date = now.toLocaleDateString("en-US");
  let time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  dateTimeElement.innerHTML = `${dayOfWeek}, ${date} ${time}`;

  // Corrected to use response.data.city for dynamic city input
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "0aodcba46dd4t713dd6b4d55b3f2bd07";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "0aodcba46dd4t713dd6b4d55b3f2bd07";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecast = document.querySelector(`#forecast`);

  let days = [`Tue`, `Wed`, `Thur`, `Fri`, `Sat`];
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<span class="row">
      <span class="col-2">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" width="50" alt="Weather Icon"> 
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperatures-max"> <strong> ${Math.round(
            day.temperature.maximum
          )}° </strong> </span>
          <span class="weather-forecast-temperatures-min">${Math.round(
            day.temperature.maximum
          )}°</span>
        </div>
      </span>
    </span>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Manteca");
