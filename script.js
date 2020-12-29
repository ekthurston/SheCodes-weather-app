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
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let weekday = weekdays[now.getDay()];
day.innerHTML = `${date} ${month} ${weekday}`
time.innerHTML =  `${hour}:${minutes}`

// Celcius and Fahrenhiet
function displayCTemp(event){
    event.preventDefault();
    let temperature = document.querySelector("#temperature");
    let celcius = 19;
    temperature.innerHTML=`${celcius}℃`;
}

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", displayCTemp);

function displayFTemp(event){
    event.preventDefault();
    let fahrenhiet= 66;
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML=`${fahrenhiet}℉`;
}

 let fahrenhiet = document.querySelector("#fahrenheit-link");
fahrenhiet.addEventListener("click", displayFTemp);

//City search location

function showTemp(response) {
let input = document.querySelector("#search-input");
let city =  document.querySelector("h1");
city.innerHTML = `${input.value}`

let displayTemp = Math.round(response.data.main.temp);
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
    let sunrise = document.querySelector(".sunrise");
    sunrise.innerHTML = `Sunrise: ${hours}:${minutes}`;
    
    let sunsetTime = (response.data.sys.sunset);
    var date = new Date (sunsetTime *1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
  }
    let sunset = document.querySelector(".sunset");
    sunset.innerHTML = ` Sunset: ${hours}:${minutes}`;
}

function showCity(event) {
  event.preventDefault();
let input = document.querySelector("#search-input")
let city = `${input.value}`
let apiKey = "b318c179003d64fe70de737d79d84778";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(`${apiUrl}`).then(showTemp);
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
    let displayTemp = Math.round(response.data.main.temp);
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML=`${displayTemp}℃`;

    let city = response.data.name;
    let currentCity = document.querySelector("h1");
    currentCity.innerHTML = `${city}`;

    let weatherDescription = (response.data.weather[0].main)
    let weather = document.querySelector("#weather-description");
    weather.innerHTML = `${weatherDescription}`;

    let sunriseTime = (response.data.sys.sunrise);
    let date = new Date (sunriseTime *1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
    let sunrise = document.querySelector(".sunrise");
    sunrise.innerHTML = ` Sunrise: ${hours}:${minutes}`;
    
    let sunsetTime = (response.data.sys.sunset);
    let date = new Date (sunsetTime *1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
    let sunset = document.querySelector(".sunset");
    sunset.innerHTML = ` Sunset: ${hours}:${minutes}`;
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