const searchBtn = document.getElementById("searchBtn");
const citySearchBox = document.getElementById("citySearchBox");
let weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Chicago&APPID=9292826a5becd0c5c9bf703ff97079b6&units=imperial";

searchBtn.addEventListener("click", () => {
    weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${citySearchBox.value}&APPID=9292826a5becd0c5c9bf703ff97079b6&units=imperial`;
    console.log(weatherURL);
    getWeather();
});

citySearchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${citySearchBox.value}&APPID=9292826a5becd0c5c9bf703ff97079b6&units=imperial`;
        console.log(weatherURL);
        getWeather();
    }
});

let loadingMsg = document.createElement("p");

async function getWeather() {
    loadingMsg.textContent = "Loading...";
    const retrievedWeather = await fetch(weatherURL, { mode: 'cors' });
    const weatherData = await retrievedWeather.json();
    const weatherDisplayObj = {
        name: weatherData.name,
        description: weatherData.weather[0].description,
        wind: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        temp: weatherData.main.temp
    }
    loadingMsg.textContent="";
    displayWeather(weatherDisplayObj);
}

const weatherDisplayArea = document.getElementById("weatherDisplayArea");
let cityDisplay = document.createElement("h1");
let descriptionDisplay = document.createElement("p");
let windDisplay = document.createElement("p");
let humidityDisplay = document.createElement("p");
let tempDisplay = document.createElement("p");
weatherDisplayArea.appendChild(loadingMsg);

const displayWeather = (weatherDisplayObj) => {
    console.log(weatherDisplayObj);
    cityDisplay.textContent = weatherDisplayObj.name;
    weatherDisplayArea.appendChild(cityDisplay);

    descriptionDisplay.textContent = weatherDisplayObj.description;
    weatherDisplayArea.appendChild(descriptionDisplay);

    windDisplay.textContent = weatherDisplayObj.wind;
    weatherDisplayArea.appendChild(windDisplay);

    humidityDisplay.textContent = weatherDisplayObj.humidity;
    weatherDisplayArea.appendChild(humidityDisplay);

    tempDisplay.textContent = weatherDisplayObj.temp;
    weatherDisplayArea.appendChild(tempDisplay);

}

getWeather();

