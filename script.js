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
    try{
        let dataFetch = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${CONFIG.API_KEY}`, {mode: 'cors'});
        let weather = await dataFetch.json();
        return weather;
    } catch(err){
        console.log("Oops! " + err);
    }
}

const showWeather = (data) => {
    console.log(`City Name: ${data.name}`);
    console.log(`Weather: ${data.weather[0].main}`);
    console.log(`Temperature: ${data.main.temp}`);
    console.log(`Humidity: ${data.main.humidity}% | Feels like ${data.main.feels_like}`);
}

getWeather("Ocala").then(showWeather);