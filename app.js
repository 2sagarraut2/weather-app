//SELECT ELEMENT 
//const element = document.querySelector(".className");

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//APP DATA
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTANTS AND VARS
const KELVIN = 273;
//API KEY 
const KEY = "2a3c67617aa59d529d19920d07404b3c";

//TO CHECK IF GEOLOCATION SERVICES ARE AVAILABLE IN USER'S DEVICE
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition( setPosition, showError );
}
else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation.<p>"
}

//SET USER"S POSITION
function setPosition( position ){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
};

//SHOW ERROR WHEN THERE IS ANY ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${ error.message } <p>`;
};

//GET WEATHER FROM API
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

//DISPLAY WEATHER TO USER

//CHANGE INNER HTML OF EVERY HTML ELEMENT IN THE FUNCTION

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// CONVERT C TO F
function celsiusToFahrenheit( temperature ){
    return (temperature * 9/5) + 32;
} 

//WHEN USER CLICKS ON TEMPERATURE ELEMENT
tempElement.addEventListener("click", function(){

    //TO PREVENT ERROR OF UNDEFINED VALUE
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit === "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }
    else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});



//TEMPERATE COMING FROM API IS IN KELVIN CONVERT IT TO CELSIUS

function convertTemp(){
    weather.temperature.value = {KELVIN} - 273;
}

