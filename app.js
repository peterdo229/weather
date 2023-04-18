const api = {
  key: "5f5cfc598ed4035841c57da54e46f2ab",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
      getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(weather => {
          return weather.json();
      })
      .then(weatherData => {
          if (weatherData.cod !== 200) { // Check for errors in API response
              throw new Error(`${weatherData.cod} - ${weatherData.message}`);
          }
          displayResults(weatherData);
      })
      .catch(error => {
          console.log(error);
          alert('Oops, something went wrong! Please try again.');
      });
}

function displayResults (weatherData) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weatherData.name}, ${weatherData.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weatherData.main.temp)}<span>°F</span>`; // Display temperature in Fahrenheit

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weatherData.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weatherData.main.temp_min)}°F / ${Math.round(weatherData.main.temp_max)}°F`; // Display temperature in Fahrenheit
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}