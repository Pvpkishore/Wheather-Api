// Function to convert UNIX timestamp to a formatted time (HH:MM AM/PM)
const searchbtn = document.querySelector("#submit");

// Function to convert Fahrenheit to Celsius
const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5/9).toFixed(2);

function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert from seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero for minutes

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

async function fetchWeather(city) {
    const cityName = city;
    
    document.getElementById("city_name").innerHTML = city;

    try {
        const response = await fetch("https://open-weather13.p.rapidapi.com/city/" + city + "/EN", {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'a431770a3fmsh7254fe3052269e7p1ccaf3jsn270899d0d699',
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
            }
        });

        const result = await response.json(); // Parse the JSON response
        console.log(result);

        // Accessing various weather data from the response
        const weatherData = {
            temperatureF: result.main.temp, // In Fahrenheit
            feelsLikeF: result.main.feels_like, // In Fahrenheit
            tempMinF: result.main.temp_min, // In Fahrenheit
            tempMaxF: result.main.temp_max, // In Fahrenheit
            pressure: result.main.pressure,
            humidity: result.main.humidity,
            seaLevel: result.main.sea_level,
            groundLevel: result.main.grnd_level,
            visibility: result.visibility,
            windSpeed: result.wind.speed,
            windDirection: result.wind.deg,
            cloudiness: result.clouds.all,
            country: result.sys.country,
            sunrise: formatTime(result.sys.sunrise), // Use the formatTime function to format sunrise
            sunset: formatTime(result.sys.sunset), // Use the formatTime function to format sunset
            timezone: result.timezone / 3600, // Converts to hours
            cityName: result.name,
            dateTime: new Date(result.dt * 1000).toLocaleString(),
        };

        // Convert temperatures from Fahrenheit to Celsius
        const temperatureC = fahrenheitToCelsius(weatherData.temperatureF);
        const feelsLikeC = fahrenheitToCelsius(weatherData.feelsLikeF);
        const tempMinC = fahrenheitToCelsius(weatherData.tempMinF);
        const tempMaxC = fahrenheitToCelsius(weatherData.tempMaxF);

        // Update the HTML elements with the weather data
        document.getElementById("Humidity").innerHTML = `${weatherData.humidity} %`;
        document.getElementById("windspeed").innerHTML = `${weatherData.windSpeed} Kph`;
        document.getElementById("pressure").innerHTML = `${weatherData.pressure} hPa`;
        document.getElementById("temperature").innerHTML = `${temperatureC} °C`;
        document.getElementById("temp_min").innerHTML = `${tempMinC} °C`;
        document.getElementById("temp_max").innerHTML = `${tempMaxC} °C`;
        document.getElementById("feelsLike").innerHTML = `${feelsLikeC} °C`;
        document.getElementById("datetime").innerHTML = `${weatherData.dateTime}`;
        document.getElementById("sunrise").innerHTML = `${weatherData.sunrise}`;
        document.getElementById("sunset").innerHTML = `${weatherData.sunset}`;
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
}

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city_name_input = document.getElementById("city_name_input").value;
    if (city_name_input) {
        fetchWeather(city_name_input);
    }
});
