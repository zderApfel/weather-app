/*
    JSON Addresses:

    City Name - data.name
    Weather - data.weather[0].main
    Temperature - data.main.temp*
    Humidity - data.main.humidity
    Feels Like - data.main.feels_like*

    * Feels Like and Temperature values are in Kelvin and will need to be converted for Celcius and Fareinheit
*/

async function getWeather(){
    const searchTerm = document.querySelector("#search-term");
    const loadingArea = document.querySelector("#city");
    try{
        loadingArea.textContent = "Loading...";
        let dataFetch = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm.value}&appid=${CONFIG.API_KEY}`, {mode: 'cors'});
        let weather = await dataFetch.json();
        weatherDOM(weather);
    } catch(err){
        displayError(err.message);
    }
}

function weatherDOM(data) {
    const CITY_NAME = document.querySelector("#city");
    const WEATHER = document.querySelector("#weather");
    const TEMPERATURE = document.querySelector("#temperature");
    const HUMIDITY = document.querySelector("#humidity");
    const FEELS_LIKE = document.querySelector("#feels-like");
    CITY_NAME.textContent = `${data.name}, ${data.sys.country}`;
    WEATHER.textContent = data.weather[0].main;
    TEMPERATURE.textContent = `Temperature - ${kelvinToF(data.main.temp)}F`;
    HUMIDITY.textContent = `Humidity - ${data.main.humidity}%`;
    FEELS_LIKE.textContent = `(Feels Like ${kelvinToF(data.main.feels_like)}F)`;
}

function kelvinToF(temperature){ //The API returns temperatures as Kelvin apparently
    let temp = (temperature - 273.15) * (9/5) + 32;
    return Math.round(temp);
}

function displayError(){
    const TEXT_DISPLAY = document.querySelector("#city");
    TEXT_DISPLAY.textContent = "Oopsies, something went wrong! Check your city name and try again or refresh the page";
}