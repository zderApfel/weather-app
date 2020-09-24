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
        return weather;
    }finally{}
}

function weatherDOM(data) {
    let tempData = setTemp(data.main.temp);
    let feelsData = setTemp(data.main.feels_like);

    const CITY_NAME = document.querySelector("#city");
    const WEATHER = document.querySelector("#weather");
    const TEMPERATURE = document.querySelector("#temperature");
    const HUMIDITY = document.querySelector("#humidity");
    const FEELS_LIKE = document.querySelector("#feels-like");
    CITY_NAME.textContent = `${data.name}, ${data.sys.country}`;
    WEATHER.textContent = data.weather[0].main;
    TEMPERATURE.textContent = `Temperature - ${tempData}F`;
    HUMIDITY.textContent = `Humidity - ${data.main.humidity}%`;
    FEELS_LIKE.textContent = `(Feels Like ${feelsData}F)`;

    const BUTTON_HOLDER = document.querySelector("#button-holder");

    const fareinheitToCelsius = document.createElement('button');
    fareinheitToCelsius.id = 'f-to-c';
    fareinheitToCelsius.className = 'conversion-button';
    fareinheitToCelsius.onclick = () => {
        tempData = fToC(tempData);
        feelsData = fToC(feelsData);
        TEMPERATURE.textContent = `Temperature - ${tempData}C`;
        FEELS_LIKE.textContent = `(Feels Like ${feelsData}C)`;
        fareinheitToCelsius.disabled = true;
        celsiusToFareinheit.disabled = false;
    };
    fareinheitToCelsius.textContent = "To C";

    const celsiusToFareinheit = document.createElement('button');
    celsiusToFareinheit.id = 'c-to-f';
    celsiusToFareinheit.className = 'conversion-button';
    celsiusToFareinheit.onclick = () => {
        tempData = cToF(tempData);
        feelsData = cToF(feelsData);
        TEMPERATURE.textContent = `Temperature - ${tempData}F`;
        FEELS_LIKE.textContent = `(Feels Like ${feelsData}F)`;
        celsiusToFareinheit.disabled = true;
        fareinheitToCelsius.disabled = false;
    };
    celsiusToFareinheit.textContent = "To F";
    celsiusToFareinheit.disabled = true;

    BUTTON_HOLDER.innerHTML = "";
    BUTTON_HOLDER.appendChild(fareinheitToCelsius);
    BUTTON_HOLDER.appendChild(celsiusToFareinheit);
}

function setTemp(temperature){ //The API returns temperatures as Kelvin apparently
    let temp = (temperature - 273.15) * (9/5) + 32;
    return Math.round(temp);
}

function fToC(temperature){
    let temp = (temperature - 32) * (5/9);
    return Math.round(temp);
}

function cToF(temperature){
    let temp = (temperature * 9/5) + 32;
    return Math.round(temp);
}

function displayError(){
    const TEXT_DISPLAY = document.querySelector("#city");
    TEXT_DISPLAY.textContent = "Oopsies, something went wrong! Check your city name and try again or refresh the page";
}
