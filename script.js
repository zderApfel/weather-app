/*
    JSON Addresses:

    City Name - data.name
    Weather - data.weather[0].main
    Temperature - data.main.temp*
    Humidity - data.main.humidity
    Feels Like - data.main.feels_like*

    * Feels Like and Temperature values are in Kelvin and will need to be converted for Celcius and Fareinheit
*/

async function getWeather(location){
    const searchTerm = document.querySelector("#search-term");
    const loadingArea = document.querySelector("#city");
    try{
        let dataFetch = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm.value}&appid=${CONFIG.API_KEY}`, {mode: 'cors'});
        let weather = await dataFetch.json();
        loadingArea.textContent = "Loading..."
        return weather;
    } catch(err){
        console.log("Oops! " + err);
    }
}

function weatherDOM(data) {
    const CITY_NAME = document.querySelector("#city");
    const WEATHER = document.querySelector("#weather");
    const TEMPERATURE = document.querySelector("#temperature");
    const HUMIDITY = document.querySelector("#humidity");
    const FEELS_LIKE = document.querySelector("#feels-like");
    CITY_NAME.textContent = data.name;
    WEATHER.textContent = data.weather[0].main;
    TEMPERATURE.textContent = `Temperature ${data.main.temp}K`;
    HUMIDITY.textContent = `Humidity: ${data.main.humidity}%`;
    FEELS_LIKE.textContent = `(Feels Like: ${data.main.feels_like}K)`;
}