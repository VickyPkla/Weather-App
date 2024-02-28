const apiKey = "890929281c2335b9d7bff020d8c3ba9c";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const input = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const icon = document.querySelector(".weather-icon");

let sunny = 'linear-gradient(135deg,#0071fa,#fac800)'; 
let cold = 'linear-gradient(135deg,#ffffff,#02a5f7)';
let rain = 'linear-gradient(135deg,#000000,#0d02a8)';
let hot = 'linear-gradient(180deg,#ebf702,#fa0b02)'; 
let cool = 'linear-gradient(135deg,#00ff95,#710aee)'; 

const weatherData = async function(cityName){
    try{
        const res = await fetch(apiURL+cityName+`&appid=${apiKey}`);
        const data = await res.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+`°c`;
        document.querySelector(".wind").innerHTML = data.wind.speed+` Km/h`;
        document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity)+`%`;
        console.log(icon.src);
        if(data.weather[0].main == "rain" || data.weather[0].main == "thunder"){
            icon.src = "images/rain.png";
            document.querySelector(".card").style.background = rain;
        }
        else if(data.main.temp >= 33){
            icon.src = "images/clear.png";
            document.querySelector(".card").style.background = hot;
        }
        else if(data.main.temp <= 33 && data.main.temp >= 20){
            icon.src = "images/clouds.png";
            document.querySelector(".card").style.background = sunny;
        }
        else if(data.main.temp <= 20 && data.main.temp>0){
            icon.src = "images/mist.png";
            document.querySelector(".card").style.background = cool;
        }
        else if(data.main.temp <= 0){
            icon.src = "images/snow.png";
            document.querySelector(".card").style.background = cold;
        }
    }
    catch(e){
        console.log("Error ",e);
    }
};
input.addEventListener("keypress",(event)=>{
    if(event.key === "Enter")
    {
        weatherData(input.value);
    }
});
btn.addEventListener("click",()=>{
        weatherData(input.value);
});