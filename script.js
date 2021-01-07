// Date and time 
let now = new Date();

let day = document.querySelector("#day")
let time = document.querySelector("#time")

let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`;
  }
  
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }
let date = now.getDate();
if (date === 1 || date === 21|| date === 31) {
date = `${date}st`;
} else if(date == 2 || date === 22){
  date = `${date}nd`;
} else if(date === 3 || date === 23){
  date = `${date}rd`;
} else {
  date = `${date}th`;
}
let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];
let weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let weekday = weekdays[now.getDay()];
day.innerHTML = `${weekday}, ${date} ${month} `
time.innerHTML =  `${hour}:${minutes}`

// Celcius and Fahrenhiet

function displayFTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fTemp = (celsiusTemperature * 9) / 5 + 32;
  let fDisplay = Math.round(fTemp);
  temperatureElement.innerHTML = `${fDisplay}℉`
}

let fahrenhiet = document.querySelector("#fahrenheit-link");
fahrenhiet.addEventListener("click", displayFTemp);

function displayCTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let cTemp = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = `${cTemp}℃`
}

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", displayCTemp);

let celsiusTemperature = null;

//City search location

function showTemp(response) {
let input = document.querySelector("#search-input");
let city =  document.querySelector("h1");
city.innerHTML = `${input.value}`;

celsiusTemperature = response.data.main.temp;

let displayTemp = Math.round(celsiusTemperature);
let temperature = document.querySelector("#temperature")
temperature.innerHTML=`${displayTemp}℃`
console.log(response)

let weatherDescription = (response.data.weather[0].main)
let weather = document.querySelector("#weather-description");
weather.innerHTML = `${weatherDescription}`

let sunriseTime = (response.data.sys.sunrise);
    var date = new Date (sunriseTime *1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
  }
    let sunrise = document.querySelector(".sunrise-time");
    sunrise.innerHTML = `${hours}:${minutes}`;
    
    let sunsetTime = (response.data.sys.sunset);
    var date = new Date (sunsetTime *1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
  }
    let sunset = document.querySelector(".sunset-time");
    sunset.innerHTML = `${hours}:${minutes}`

    let iconElement = document.querySelector("#weather-icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].main)

}

function displayForecast (response){
  console.log(response)
}

function showCity(event) {
  event.preventDefault();
let input = document.querySelector("#search-input")
let city = `${input.value}`
let apiKey = "b318c179003d64fe70de737d79d84778";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(`${apiUrl}`).then(showTemp);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
axios.get(`${apiUrl}`).then(displayForecast);
}

let formLocation = document.querySelector("#search-bar");
formLocation.addEventListener("submit", showCity);


function citySearch(event) {
    event.preventDefault();
    let input = document.querySelector("#search-input");
    let city =  document.querySelector("h1");
    city.innerHTML = `${input.value}`;
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", citySearch);

function showTemperature(response) {

  celsiusTemperature = response.data.main.temp;

    let displayTemp = Math.round(celsiusTemperature);
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML=`${displayTemp}℃`;

    let city = response.data.name;
    let currentCity = document.querySelector("h1");
    currentCity.innerHTML = `${city}`;

    let weatherDescription = (response.data.weather[0].main)
    let weather = document.querySelector("#weather-description");
    weather.innerHTML = `${weatherDescription}`;

    let sunriseTime = (response.data.sys.sunrise);
    var date = new Date (sunriseTime *1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
    let sunrise = document.querySelector(".sunrise-time");
    sunrise.innerHTML = `${hours}:${minutes}`;
    
    let sunsetTime = (response.data.sys.sunset);
    var date = new Date (sunsetTime *1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
  }
    let sunset = document.querySelector(".sunset-time");
    sunset.innerHTML = `${hours}:${minutes}`

    let iconElement = document.querySelector("#weather-icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].main)
  }

function getLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "b318c179003d64fe70de737d79d84778";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}
function searchLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", searchLocation);