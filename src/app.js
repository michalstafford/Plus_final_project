/** @format */
function refreshWeather(response) {
  console.log(response.data.temperature.current);


  let temperatureElement = document.querySelector("#current-temp-value");
  let cityElement = document.querySelector(".weather-app-city");
  let descriptionElement = document.querySelector(
    "#current-weather-conditions"
  );
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateTimeElement = document.querySelector("#current-date-time");
  let temperature = response.data.temperature.current;
  let iconElement = document.querySelector("#icon");


  console.log(response);
  console.log(response.data.condition.description);

  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} mph`; //
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class ="current-temp-icon">`;

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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Manteca");
