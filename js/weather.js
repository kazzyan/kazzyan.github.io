const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");

const API_KEY = "d4829b847589494d4b67f92754847bdd";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        weather.innerText = `${data.main.temp}도 ${data.weather[0].main}`;
        city.innerText = data.name;
    });
}

function onGeoError() {
    alert("위치 권한이 없습니다. 새로고침 후 위치권한 설정을 허용해주세요.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

