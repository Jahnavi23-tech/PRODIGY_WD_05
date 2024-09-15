const apiKey = '9f90d1c16816907acbdb703897a3bb75'; // Replace with your OpenWeatherMap API key

// Handle the search form submission
document.getElementById('cityInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const city = e.target.value.trim();
    if (city) {
      getWeatherDataByCity(city);
    }
  }
});

// Handle the geolocation button
document.getElementById('geoButton').addEventListener('click', function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherDataByLocation(lat, lon);
    }, () => {
      showErrorMessage();
    });
  } else {
    showErrorMessage();
  }
});

// Fetch weather data by city name
function getWeatherDataByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchWeatherData(url);
}

// Fetch weather data by coordinates
function getWeatherDataByLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  fetchWeatherData(url);
}

// Fetch weather data from the API
function fetchWeatherData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeatherData(data);
      } else {
        showErrorMessage();
      }
    })
    .catch(() => {
      showErrorMessage();
    });
}

// Display weather data on the page
function displayWeatherData(data) {
  document.getElementById('weatherSection').style.display = 'block';
  document.getElementById('noResults').style.display = 'none';
  document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('temperature').innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
  document.getElementById('description').innerText = data.weather[0].description;
  document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind').innerText = `Wind: ${data.wind.speed} m/s`;
  document.getElementById('precipitation').innerText = `Precipitation: ${data.clouds.all}% cloud cover`;
}

// Show an error message
function showErrorMessage() {
  document.getElementById('weatherSection').style.display = 'none';
  document.getElementById('noResults').style.display = 'block';
}
