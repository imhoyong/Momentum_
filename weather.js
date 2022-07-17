const API_KEY = "d7dea7a37d8f19f0199168362e50687a";

function onGeoOk(position) {
    const lat = position.coords.latitude;       // object의 latitude 값 저장 위도경도
    const log = position.coords.longitude;      // object의 longitude 값 저장 위도경도
    console.log(position)
    console.log("you live in ",lat,log);        //
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`;    
    console.log(url);               // openweathermap.org 에서 알려준 url ^
    
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(data.name, data.weather[0].main, data.main.temp);

        const weather = document.querySelector('#weather span:first-child');
        const city = document.querySelector('#weather span:last-child');
       
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        city.innerText = data.name;


    })      // javaScript가 대신 url에 방문해줄것이다// fetch가 서버에 뭔갈 요청하고 응답을 받음 promise
    
}

function onGeoError() {
    alert("Can't find your location")
}

// 사용자의 현재 지역의 위치를 나타내기 위함, (성공시, 실패시)
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);
