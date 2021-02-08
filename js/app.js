const APIkey = "5cbc6546ca804537872104341210802";
const module_weather = document.querySelector(".module__weather");
const form = document.querySelector(".module__form");
const section = document.querySelector("#app")

const getWeather = (city) => {
    fetch(`
    http://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${city}&days=5
    `)
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((res) => {
        console.log(res);
        insertForecast(res);       
    })
    .catch(error => console.log(error))
}

const insertForecast = (forecast) => {
    const weather = module_weather.cloneNode(true);
    weather.hidden = false;
    const today = forecast.forecast.forecastday[0].day;

    const todayWeatherInfo = weather.querySelector(".weather__info");
    const city = todayWeatherInfo.querySelector(".city__name");
    city.innerHTML = forecast.location.name;
    const todayTemp = todayWeatherInfo.querySelector(".temperature__value");
    todayTemp.innerHTML = today.avgtemp_c

    const todayWeatherDetails = weather.querySelector(".weather__details")
    const spans = todayWeatherDetails.querySelectorAll("span")
    spans[0].innerHTML = getAvgPressure(forecast.forecast.forecastday[0].hour) + " hPa"
    spans[1].innerHTML = today.avghumidity + "%"
    spans[2].innerHTML = today.avgvis_km + " m/s"

    section.appendChild(weather);
}

const getAvgPressure = (hours) => {
    let pressure = 0
    for (let hour of hours) {
        pressure += parseInt(hour.pressure_mb)
    }
    avgPressure = Math.floor(pressure / hours.length)
    return avgPressure
}

getWeather("Warszawa");
