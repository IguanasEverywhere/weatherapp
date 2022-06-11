const searchBtn = document.getElementById("searchBtn");
const citySearchBox = document.getElementById("citySearchBox");
const unitButton = document.getElementById("unitSelector");
let currentUnit = "fahrenheit";
let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&APPID=9292826a5becd0c5c9bf703ff97079b6&units=imperial";

searchBtn.addEventListener("click", () => {
    weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchBox.value}&APPID=9292826a5becd0c5c9bf703ff97079b6&units=imperial`;
    getWeather();
    citySearchBox.value = "";
});

citySearchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchBox.value}&APPID=9292826a5becd0c5c9bf703ff97079b6&units=imperial`;
        getWeather();
        citySearchBox.value = "";
    }
});

let loadingMsg = document.createElement("p");

async function getWeather() {
    try {
        loadingMsg.textContent = "Loading...";
        const retrievedWeather = await fetch(weatherURL, { mode: 'cors' });
        const weatherData = await retrievedWeather.json();
        const weatherDisplayObj = {
            name: weatherData.name,
            description: weatherData.weather[0].description,
            wind: weatherData.wind.speed,
            humidity: weatherData.main.humidity,
            temp: weatherData.main.temp,
            iconID: weatherData.weather[0].icon
        }
        loadingMsg.textContent = "";
        displayWeather(weatherDisplayObj);
    } catch(err) {
        console.log(err);
        alert("No City By That Name Found!");
    }

}

const weatherDisplayArea = document.getElementById("weatherDisplayArea");
weatherDisplayArea.appendChild(loadingMsg);
let cityDisplay = document.getElementById("cityDisplay");
let descriptionDisplay = document.getElementById("descriptionDisplay");
let windDisplay = document.getElementById("windDisplay");
let humidityDisplay = document.getElementById("humidityDisplay");
let tempDisplay = document.getElementById("tempDisplay");

let conditionsImg = document.getElementById("conditionsImg");

const displayWeather = (weatherDisplayObj) => {
    cityDisplay.textContent = weatherDisplayObj.name;
    tempDisplay.textContent = weatherDisplayObj.temp + "°";
    descriptionDisplay.textContent = "Conditions: " + weatherDisplayObj.description.toUpperCase();
    conditionsImg.setAttribute("src", `http://openweathermap.org/img/wn/${weatherDisplayObj.iconID}@2x.png`);
    windDisplay.textContent = "Wind: " + weatherDisplayObj.wind + " mph";
    humidityDisplay.textContent = "Humidity: " + weatherDisplayObj.humidity + "%";
}

unitButton.addEventListener("click", () => {
    if (currentUnit === "fahrenheit") {
        currentUnit = "celcius";
        weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay.textContent}&APPID=9292826a5becd0c5c9bf703ff97079b6&units=metric`;
        getWeather();
    } else if (currentUnit === "celcius") {
        currentUnit = "fahrenheit";
        weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay.textContent}&APPID=9292826a5becd0c5c9bf703ff97079b6&units=imperial`;
        getWeather();
    }
});

getWeather();
