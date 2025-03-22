document.addEventListener("DOMContentLoaded", () => {
    // Weather Section - Current Weather
    const apiKey = "04dc13bc81b9f9184a66c71d8c17d6ec";
    const city = "Highland,UT,US";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    async function fetchCurrentWeather() {
        try {
            const response = await fetch(currentWeatherUrl);
            const data = await response.json();
            displayCurrentWeather(data);
        } catch (error) {
            console.error("Error fetching current weather data:", error);
            document.getElementById("current-temp").textContent = "N/A";
            document.getElementById("weather-desc").textContent = "Unable to load weather data";
        }
    }

    function displayCurrentWeather(data) {
        const temp = Math.round(data.main.temp);
        const high = Math.round(data.main.temp_max);
        const low = Math.round(data.main.temp_min);
        const humidity = data.main.humidity;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const weatherEvents = data.weather.map(event => {
            return event.description
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }).join(", ");

        document.getElementById("current-temp").textContent = temp;
        document.getElementById("current-high").textContent = high;
        document.getElementById("current-low").textContent = low;
        document.getElementById("current-humidity").textContent = humidity;
        document.getElementById("current-sunrise").textContent = sunrise;
        document.getElementById("current-sunset").textContent = sunset;
        document.getElementById("weather-desc").textContent = weatherEvents;
    }

    fetchCurrentWeather();
});