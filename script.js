let appId = '45c21512d5f5e7e8f9742e1d1e405e76';
let units = 'metric';
let searchMethod;
function getSearchMethod(searchTerm) {
  if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
     searchMethod = 'zip';
  else
     searchMethod = 'q';   
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then (result => {
      return result.json();
  }).then(result => {
      init(result);
  })

}

function init(resultFromServer) {
switch (resultFromServer.weather[0].main) {
  case 'Clear':
      document.body.style.backgroundImage = 'url("clear.jpg")';
      break;
  case 'Clouds':
      document.body.style.backgroundImage = 'url("cloud.jpg")';
      break;

  case 'Rain':
  case 'Drizzle':
  case 'Mist':
      document.body.style.backgroundImage = 'url("road-landscape-nature-forest-39811 (1).jpg")';
      break;
  case 'Haze':
  case 'smoke':
    document.body.style.backgroundImage = 'url("haze.jpg")';
    break;

  case 'Thunderstorm':
      document.body.style.backgroundImage = 'url("storm.jpg")';
      break;

  case 'Snow':
      document.body.style.backgroundImage = 'url("snow.jpg")';
      break;
     
  default:
    break;    
  }

  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  

let resultDescription = resultFromServer.weather[0].description;
weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
cityHeader.innerHTML = resultFromServer.name;
humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + ' %';

setPositionForWeatherInfo();

}

function setPositionForWeatherInfo() {
   let weatherContainer = document.getElementById('weatherContainer');
   let weatherContainerHeight = weatherContainer.clientHeight;
   let weatherContainerWidth = weatherContainer.clientWidth;

   weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/1.95}px)`;
   weatherContainer.style.top = `calc(50% - ${weatherContainerWidth/2}px)`;
   weatherContainer.style.visibility = 'visible';
}

var search = document.getElementById('a');
search.addEventListener('click', () => {let searchTerm = document.getElementById('searchInput').value;
  if(searchTerm)
    searchWeather(searchTerm);
})