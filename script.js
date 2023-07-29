const search = document.getElementById('search');
const btn = document.querySelector('.btn');
let result = document.getElementById('result');
const main = document.getElementById('main');

btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (search.value !== "") {
        fetchWeather(search.value);
    }
});

async function fetchWeather(value) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd6713fe13cmsh9360868f32591fep1e8b4djsn438ddd66d1f6',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    let weather = await fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + value, options);

    if (weather.status == 200) {
        weather = await weather.json();

        main.style.boxShadow = '1px 1px 1px rgba(0, 0, 0, 0.1)';

        main.innerHTML = `
        <div class="first">
            <h2 class="city">${value.toUpperCase()}</h2>
        </div>
        <div class="second">
            <div class="mb-3 d-flex justify-content-center flex-column align-items-center">
                <h1 id="temp">${weather.temp}°C</h1>
            </div>
            <h6>Feels like : <span id="feels-like">${weather.feels_like}°C</span></h6>
            <h6>Humidity : <span id="humidity">${weather.humidity}</span></h6>
            <h6>Wind Speed : <span id="wind">${weather.wind_speed} km/hr</span></h6>
        </div>
        `;
    }
    if (weather.status == 400) {
        main.innerHTML = '<h1 style="text-align: center;">NOT FOUND</h1>';
    }
}