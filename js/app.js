const formLocation = document.querySelector("#form-location");
const containerWeatherInfo = document.querySelector("#weather-info");
const containerTodayWeather = document.querySelector("#container-today-weather");
containerTodayWeather.style.display = "none";


//función para traer la localización del usuario
const getLocation = (e) => {
    e.preventDefault();
    const userLocation = document.querySelector("#place-location").value; //valor de la localización del usuario
    searchCoordinate(userLocation);
}

formLocation.addEventListener("submit", getLocation)

//función para llamar  a la api de google maps para obtener las coordenadas
const searchCoordinate = location => {

    const mainContainer = document.querySelector("#main");
    mainContainer.style.display = "none";
    containerTodayWeather.style.display = "block";

    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyACfsDZJprR3zNH4n5srTk8IqEDq2-gyEU`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const lat = data.results[0].geometry.location.lat;
            const lng = data.results[0].geometry.location.lng;
            todayWeather(lat,lng)
        })

        .catch( e => console.log( 'Something went wrong' ) );
}

const todayWeather = (lat, lng) => {
  let urlWeather = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/cead9f3d98bcb4e20435fcd5a7a912cc/${lat},${lng}`
  fetch(urlWeather)
      .then(response => response.json())
      .then(data => {
        const currentlyWeather = data.currently;
        const infoWeather = data.daily.summary;

        const iconWeather = currentlyWeather.icon;
        const summary = currentlyWeather.summary
        const temperature = currentlyWeather.apparentTemperature;
        const wind = currentlyWeather.windSpeed;
        const humidity = currentlyWeather.humidity;
        const uvIndex = currentlyWeather.uvIndex
        const pressure = currentlyWeather.pressure;

        const dailyWeather = data.daily.data; //clima de los días de la semana
        printDataWeather(summary, infoWeather, iconWeather, temperature, wind, humidity, uvIndex, pressure);
        printDailyWeather(dailyWeather);

      })
}


const printDataWeather = (summary, infoWeather, iconWeather, temperature, wind, humidity, uvIndex, pressure) => {
    const printWeather = `
    <div class="row center-align">
    <div class="col s12">
        <h4>${summary}</h4>
        <h4>${temperature}</h4>
        <p>${infoWeather}</p>
    </div>
    </div>
    <div class="row">
    <div class="col s6 m3 offset-m3">
        <h6 class="weather-features">Wind</h6>
    </div>
    <div class="col s6 m3">
        <p class="data-weather">${wind}</p>
    </div>
    </div>
    <div class="row">
    <div class="col s6 m3 offset-m3">
        <h6 class="weather-features">Humidity</h6>
    </div>
    <div class="col s6 m3">
        <p>${humidity}</p>
    </div>
    </div>

    <div class="row">
        <div class="col s6 m3 offset-m3">
            <h5 class="weather-features">UV index</h5>
        </div>
        <div class="col s6 m3">
            <p>${uvIndex}</p>
        </div>
    </div>

    <div class="row">
        <div class="col s6 m3 offset-m3">
            <h6 class="weather-features">Pressure</h6>
        </div>
        <div class="col s6 m3">
            <p>${pressure}</p>
        </div>
    </div>
    `;

    const containerInfo = document.createElement("div");
    containerInfo.classList.add("container");
    containerInfo.innerHTML = printWeather;
    containerWeatherInfo.appendChild(containerInfo);
}





const printDailyWeather = dailyW => {

  //containerTodayWeather.style.display = "none";
  dailyW.forEach(day => {
        const utcSeconds = day.time;
        const iconDay = day.icon
        const temperatureLow = day.temperatureLow;
        const temperatureHigh = day.temperatureHigh;

        const date = new Date(utcSeconds * 1000).toLocaleDateString("es-Mx", {weekday :"long", day:"numeric"}); // The 0 there is the key, which sets the date to the epoch


        const dayWeather = `
        <div class="row">
          <div class="col s3 offset-s3 m2 offset-m3">
            <h6 class="day-weather-date">${date} </h6>
            </div>
          <div class="col s5 m5">
            <h5 class="day-weather"> Min: ${temperatureLow}  -  Max: ${temperatureHigh}</h5>
          </div>
        </div>
        `;

        const containerDay = document.createElement("div");
        containerDay.innerHTML = dayWeather;
        const containerWeatherDay = document.getElementById("weather-day")
        containerWeatherDay.appendChild(containerDay);
    })
}
//<span>${iconDay}</span>

const btnDailyWeather = document.querySelector("#btn-daily-weather");
btnDailyWeather.addEventListener("click", printDailyWeather)
