/* The Concept */
/*=========================================================================*/
/* User sends a fetch request in the form of a location name (city, area) 
 The request is sent to the server(database) using the fetch API to obtain related data 
 The server on knowing that the API key used is valid, sends the data in a semi-structured format 
 These data are then fetched from the json file, and displayed where they are defined by the ids 
/*-----------------------------------------------------------------------*/
 


const apikey = "3265874a2c77ae4a04bb96236a642d2f";   // This is the API key

const main = document.getElementById("main");  // The main section where the header, searchbox and the weather display areas exist.
const form = document.getElementById("form"); // the place where the weather info will be displayed.
const search = document.getElementById("search"); // the search box where user needs to enter the area name.

const url = (city) =>  // url function has parameter as city (user entered city name)
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();  // json file will be returned in response

    console.log(respData); // response data will be the temperature in Kelvin

    addWeatherToPage(respData);  /// this response data be added to the webpage.
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);  //data fetched in Kelvin. Convert to Celsius

    const weather = document.createElement("div"); // this div is created at runtime
    weather.classList.add("weather");

    //javascript controlled html display
    weather.innerHTML = `  
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;

    // cleanup
    main.innerHTML = ""; // clears the div and the searchbox text on a new search request

    main.appendChild(weather); // adds after the weather section
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {  // this is used to obtain (listen) user input
    e.preventDefault();

    const city = search.value;  // from the 'city' parameter obtained, we need the values 

    if (city) {
        getWeatherByLocation(city); // check if this is the city requested, it will return it's corresponding value
    }
});