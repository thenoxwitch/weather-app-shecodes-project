//darktheme
function changeTheme() {
  let body = document.querySelector("body");
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}

//date
let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

h2.innerHTML = `📅${day} <br />🕒${hours}:${minutes}`;

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
        
          <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            
          
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="45"
            />
            <div class ="weather-forecast-temperatures">
            <strong class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°C</strong>
            <br />
            <em class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°C</em>
            
          
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
//WEATHERAPI

function displayWeather(response) {
  console.log(response.data);
  let h3 = document.querySelector("h3");
  let temperature = Math.round(response.data.main.temp);
  h3.innerHTML = `${temperature}° `;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].description;
  let conditions = document.querySelector(".conditions");
  let humidity = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");

  let celsiusTemperature = response.data.main.temp;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);

  let speed = response.data.wind.speed;
  conditions.innerHTML = ` <strong>Humidity:</strong><br />${humidity}%<br /> 
  <strong>Wind Speed:</strong><br />${speed}km/hr`;
}

function searchCity(city) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

//search form
function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  searchCity(searchInput.value);
}
//units

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", search);

searchCity("London");
let themeButton = document.querySelector(".dark-mode");
themeButton.addEventListener("click", changeTheme);
