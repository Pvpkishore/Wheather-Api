// const url = 'https://weather-api138.p.rapidapi.com/weather?city_name=Delhi';
const searchbtn = document.querySelector("#submit");

async function fetchWeather(city) {
    const city_name = document.getElementById("city_name");
    city_name.innerHTML = city;
    try {
        const response = await fetch("https://open-weather13.p.rapidapi.com/city/" + city_name + "/EN", {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'a431770a3fmsh7254fe3052269e7p1ccaf3jsn270899d0d699',
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
            }
        });

        const result = await response.json(); // Parse the JSON response

        // Accessing various weather data from the response
        const weatherData = {
            temperature: result.main.temp,
            feelsLike: result.main.feels_like,
            tempMin: result.main.temp_min,
            tempMax: result.main.temp_max,
            pressure: result.main.pressure,
            humidity: result.main.humidity,
            seaLevel: result.main.sea_level,
            groundLevel: result.main.grnd_level,
            visibility: result.visibility,
            windSpeed: result.wind.speed,
            windDirection: result.wind.deg,
            cloudiness: result.clouds.all,
            country: result.sys.country,
            sunrise: new Date(result.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(result.sys.sunset * 1000).toLocaleTimeString(),
            timezone: result.timezone,
            cityName: result.name,
            dateTime: new Date(result.dt * 1000).toLocaleString(),
            statusCode: result.cod,
            latitude: result.coord.lat,
            longitude: result.coord.lon
        };
        const Humidity = document.getElementById("Humidity");
        const windspeed = document.getElementById("windspeed");
        const temperature = document.getElementById("temperature");
        const temp_min = document.getElementById("temp_min");
        const temp_max = document.getElementById("temp_max");
        const feels_like = document.getElementById("feels_like");
        const country = document.getElementById("country");
        const timezone = document.getElementById("timezone");
        const datetime = document.getElementById("datetime");
        const pressure = document.getElementById("pressure");
        const sunrise = document.getElementById("sunrise");
        const sunset = document.getElementById("sunset");

        Humidity.innerHTML = `${weatherData.humidity} %`;
        windspeed.innerHTML = `${weatherData.windSpeed} m/s`;
        pressure.innerHTML = `${weatherData.pressure} hPa`;
        temperature.innerHTML = `${weatherData.temperature} K`;
        temp_min.innerHTML = `${weatherData.tempMin} K`;
        temp_max.innerHTML = `${weatherData.tempMax} K`;
        feels_like.innerHTML = `${weatherData.feelsLike} K`;
        country.innerHTML = `${weatherData.temperature}`;
        timezone.innerHTML = `${weatherData.timezone} hPa`;
        datetime.innerHTML = `${weatherData.dateTime} `;
        sunrise.innerHTML = `${weatherData.sunrise} `;
        sunset.innerHTML = `${weatherData.sunset} `;
    }
    catch (error) {
        console.log("Error fetching weather data:", error);
    }
}

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city_name = document.getElementById("city_name_input").value;
    if (city_name) {
        fetchWeather(city_name);
    }
});
// fetchWeather("Delhi")

