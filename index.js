// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = "4f1f455462d041458b975557231309";
const apiUrl = "https://api.weatherapi.com/v1/current.json";
const defaultLocation = "Kigali"; // Default location

// Function to fetch weather data for a location
async function getWeatherData(location) {
  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}&q=${location}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeatherInfo(weatherData) {
  const weatherInfo = document.getElementById("weather-info");

  if (!weatherData || !weatherData.location || !weatherData.current) {
    // Handle missing or invalid data
    weatherInfo.innerHTML = "<p>Weather data not available.</p>";
    return;
  }

  const location = weatherData.location;
  const current = weatherData.current;
  const iconUrl = `https:${current.condition.icon}`;

  weatherInfo.innerHTML = `
    <img src="${iconUrl}" alt="${current.condition.text}" class="weather-icon">
    <h2>Weather in ${location.name}, ${location.country}</h2>
    <table>
      <tr class="table-header">
        <th>Region</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Timezone</th>
      </tr>
      <tr>
        <td>${location.region}</td>
        <td>${location.lat}</td>
        <td>${location.lon}</td>
        <td>${location.tz_id}</td>
      </tr>
    </table>
    <hr>
    <h3>Current Conditions</h3>
    <table>
      <tr class="table-header">
        <th>Last Updated</th>
        <th>Temperature (Celsius)</th>
        <th>Temperature (Fahrenheit)</th>
        <th>Daylight</th>
      </tr>
      <tr>
        <td>${current.last_updated}</td>
        <td>${current.temp_c}°C</td>
        <td>${current.temp_f}°F</td>
        <td>${current.is_day ? "Yes" : "No"}</td>
      </tr>
    </table>
    <hr>
    <table>
      <tr class="table-header">
        <th>Weather Condition</th>
        <th>Wind Speed (mph)</th>
        <th>Wind Speed (kph)</th>
        <th>Wind Degree</th>
      </tr>
      <tr>
        <td>${current.condition.text}</td>
        <td>${current.wind_mph}</td>
        <td>${current.wind_kph}</td>
        <td>${current.wind_degree}°</td>
      </tr>
    </table>
    <hr>
    <table>
      <tr class="table-header">
        <th>Wind Direction</th>
        <th>Pressure (mb)</th>
        <th>Pressure (inches)</th>
        <th>Precipitation (mm)</th>
      </tr>
      <tr>
        <td>${current.wind_dir}</td>
        <td>${current.pressure_mb} mb</td>
        <td>${current.pressure_in} in</td>
        <td>${current.precip_mm} mm</td>
      </tr>
    </table>
    <hr>
    <table>
      <tr class="table-header">
        <th>Precipitation (inches)</th>
        <th>Humidity</th>
        <th>Cloud Cover</th>
        <th>Feels Like (Celsius)</th>
      </tr>
      <tr>
        <td>${current.precip_in} in</td>
        <td>${current.humidity}%</td>
        <td>${current.cloud}%</td>
        <td>${current.feelslike_c}°C</td>
      </tr>
    </table>
    <hr>
    <table>
      <tr class="table-header">
        <th>Feels Like (Fahrenheit)</th>
        <th>Visibility (km)</th>
        <th>Visibility (miles)</th>
        <th>UV Index</th>
      </tr>
      <tr>
        <td>${current.feelslike_f}°F</td>
        <td>${current.vis_km} km</td>
        <td>${current.vis_miles} miles</td>
        <td>${current.uv}</td>
      </tr>
    </table>
    <hr>
    <table>
      <tr class="table-header">
        <th>Gust Speed (mph)</th>
        <th>Gust Speed (kph)</th>
      </tr>
      <tr>
        <td>${current.gust_mph}</td>
        <td>${current.gust_kph}</td>
      </tr>
    </table>
  `;
}

// Function to fetch and display weather data for the default location (Kigali)
async function displayWeatherForDefaultLocation() {
  const weatherData = await getWeatherData(defaultLocation);
  displayWeatherInfo(weatherData);
}

// Call the function to display weather for the default location when the page loads
window.addEventListener("load", displayWeatherForDefaultLocation);

// Form submission handler
const weatherForm = document.getElementById("weather-form");
weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const locationInput = document.getElementById("location");
  const location = locationInput.value;

  if (location) {
    const weatherData = await getWeatherData(location);
    displayWeatherInfo(weatherData);
  }
});
