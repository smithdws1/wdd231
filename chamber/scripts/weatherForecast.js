document.addEventListener("DOMContentLoaded", () => {
    // Weather Section - Forecast
    const apiKey = "04dc13bc81b9f9184a66c71d8c17d6ec";
    const city = "Highland,UT,US";
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    async function fetchForecast() {
        try {
            const response = await fetch(forecastUrl);
            const data = await response.json();
            displayForecast(data);
        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    }

    function displayForecast(data) {
        const forecastContainer = document.getElementById("forecast-container");
        forecastContainer.innerHTML = "";

        const dailyForecasts = [];
        const seenDates = new Set();

        for (const forecast of data.list) {
            const date = new Date(forecast.dt * 1000);
            const dateString = date.toLocaleDateString();
            const hour = date.getHours();

            if (!seenDates.has(dateString) && hour >= 12 && dailyForecasts.length < 3) {
                dailyForecasts.push(forecast);
                seenDates.add(dateString);
            }

            if (dailyForecasts.length === 3) break;
        }

        dailyForecasts.forEach((forecast, index) => {
            const date = new Date(forecast.dt * 1000);
            const today = new Date().toLocaleDateString();
            const forecastDate = date.toLocaleDateString();
            let dayName;

            if (forecastDate === today) {
                dayName = "Today";
            } else {
                dayName = date.toLocaleDateString("en-US", { weekday: "short" });
            }

            const temp = Math.round(forecast.main.temp);

            const forecastDay = document.createElement("div");
            forecastDay.classList.add("forecast-day");
            forecastDay.innerHTML = `
                <p><strong>${dayName}:</strong> ${temp}°F</p>
            `;
            forecastContainer.appendChild(forecastDay);
        });
    }

    fetchForecast();
});