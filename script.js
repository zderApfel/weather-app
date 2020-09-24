async function getWeather(location){
    try{
        let dataFetch = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=590d636504a11a0be1e2306aae89453a`, {mode: 'cors'});
        let weather = await dataFetch.json();
        return weather;
    } catch(err){
        console.log("Oops! " + err)
    }
}

const showWeather = (data) => {
    console.log(`City Name: ${data.name}`);
    console.log(`Weather: ${data.weather[0].main}`);
    console.log(`Temperature: ${data.main.temp}`);
    console.log(`Humidity: ${data.main.humidity}% | Feels like ${data.main.feels_like}`);
}

getWeather("Ocala").then(showWeather);