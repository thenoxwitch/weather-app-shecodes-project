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

h2.innerHTML = `${day} ${hours}:${minutes}`;

//search form
function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  searchCity(searchInput.value);
}
let form = document.querySelector("#search-city-form");
form.addEventListener("submit", search);

//WEATHERAPI

function displayWeather(response) {
  console.log(response.data);
  let h3 = document.querySelector("h3");
  let temperature = Math.round(response.data.main.temp);
  h3.innerHTML = `${temperature}°`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].description;
  let conditions = document.querySelector(".conditions");
  let humidity = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let speed = response.data.wind.speed;
  conditions.innerHTML = ` <strong>Humidity:</strong><br />${humidity}%<br /> 
  <strong>Wind Speed:</strong><br />${speed}km/hr`;
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

//geolocation api
function showPosition(position) {
  let p = document.querySelector(".geolocation-current");
  p.innerHTML = `Your Latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
