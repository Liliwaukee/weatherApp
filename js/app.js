

const containerWeatherInfo = document.querySelector("#weather-info");
const containerWeatherDay = document.querySelector("#weather-day");
const searchLatitude = document.querySelector("#latitude");
const searchLongitude = document.querySelector("#longitude");
const btnWeather = document.querySelector("#btn-weather");
const btnDailyWeather = document.querySelector("#btn-daily-weather");

const mainContainer = document.querySelector("#main");
const containerTodayWeather = document.querySelector("#container-today-weather");
const containerDailyWeather = document.querySelector("#container-daily-weather");

containerTodayWeather.style.display = "none";
containerDailyWeather.style.display = "none";


const handleResponse = data => {
    const currentlyWeather = data.currently;

    const iconWeather = currentlyWeather.icon;
    const temperature = currentlyWeather.apparentTemperature;
    const wind = currentlyWeather.windSpeed;
    const humidity = currentlyWeather.humidity;
    const uvIndex = currentlyWeather.uvIndex
    const pressure = currentlyWeather.pressure;

    const dailyWeather = data.daily.data; //clima de los días de la semana

    printDataWeather(iconWeather, temperature, wind, humidity, uvIndex, pressure);
    printDailyWeather(dailyWeather);
}

const printDataWeather = (iconWeather, temperature, wind, humidity, uvIndex, pressure) => {
    const printWeather = `
    <div class=row">
    <div class="col s12">
        <h2>${temperature}</h2>
    </div>
    </div>
    <div class=row">
    <div class="col s12">
        <h6 class="weather-features">Wind</h6><span>${wind}</span>
    </div>
    </div>
    <div class=row">
    <div class="col s12">
        <h6 class="weather-features">Humidity</h6><span>${humidity}</span>
    </div>
    </div>

    <div class=row">
        <div class="col s5 m5">
            <h5 class="weather-features">UV index</h5>
        </div>
        <div class="col s5 m5">
            <span>${uvIndex}</span>
        </div>
    </div>

    <div class=row">
        <div class="col s5 m5">
            <h6 class="weather-features">Pressure</h6>
        </div>
        <div class="col s5 m5">
            <span>${pressure}</span>
        </div>
    </div>
    `;

    const containerInfo = document.createElement("div");
    containerInfo.classList.add("container");
    containerInfo.innerHTML = printWeather;
    containerWeatherInfo.appendChild(containerInfo);
}

const printDailyWeather = dailyW => { dailyW.forEach(day => {
        console.log(day);
        const utcSeconds = day.time;
        const iconDay = day.icon
        const temperatureLow = day.temperatureLow;
        const temperatureHigh = day.temperatureHigh;
        const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date.setUTCSeconds(utcSeconds)

        const dayWeather = `
        <span>${iconDay}</span>
        <h6>${date}</h6>
        <span>${temperatureLow}</span>
        <span>${temperatureHigh}</span>
        `;

        const containerDay = document.createElement("div");
        containerDay.innerHTML = dayWeather;
        containerWeatherDay.appendChild(containerDay);
    })
}

//


const bringData = () =>{

    mainContainer.style.display = "none";
    containerTodayWeather.style.display = "block";

    const latitude = searchLatitude.value;
    const longitude = searchLongitude.value;

    $.ajax({

        url:"https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/cead9f3d98bcb4e20435fcd5a7a912cc/"+latitude+","+longitude
    }).done(handleResponse);
}

btnWeather.addEventListener("click", bringData)
btnDailyWeather.addEventListener("click", printDailyWeather)
