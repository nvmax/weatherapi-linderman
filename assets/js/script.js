


// https://openweathermap.org/api/one-call-api

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// weather api connection 
var weatherAPI= "https://api.openweathermap.org/data/2.5/weather?q="
var weatherAPIKey = "&appid=d12e589f389b69a0b72ac61ad3e26448"
var savedCity ="";
console.log(weatherAPI)





// gets text from id="search-input" on btn-info click and pass value to logCity function
$(".btn-info").on("click", function(event) {
    event.preventDefault();
    var city = $("#search-input").val();
    console.log(city);
    logCity(city);
    getWeather(city);
}
)



//function to log city name to local storage every time btn-info is clicked and append to list of cities 
// need function to see if its already in the list and if not add it
function logCity(city) {
    var cityList = JSON.parse(localStorage.getItem("cityList"));
    if (cityList === null) {
        cityList = [];
    }
    if (cityList.indexOf(city) === -1) {
        cityList.push(city);
        localStorage.setItem("cityList", JSON.stringify(cityList));
    }
    console.log(cityList);
    displayCities(cityList);
}  // works - checked shows ["Las Vegas", "Minneapolis "] 0: "Las Vegas" 1: "Minneapolis " used Las Vegas twice but only recorded once




// function to parse data from local storage city list
var getcities =() => {
    $("#city-list").empty();
    // if local storage is empty, return empty array
    if (localStorage.length === 0) {
        if (savedCity){
            $("search-input").attr("value", savedCity);
        } else {
            $("search-input").attr("value", "Minneapolis");
        }
    }else {
        // need to get city written fom local storage
        // using info from scott casey from class, still not working
    
     var lastcityitem = "city-list"+(localStorage.length-1);
     lastCity = localStorage.getItem(lastcityitem);

     $("#search-input").attr("value", lastCity);

     for (let i=0; i<localStorage.length; i++) {
        var city  = localStorage.getItem("city-list"+i);
        var cityEL;
    if (loadedcity === null) {
        loadedcity = lastCity;
    } 
    if (city === loadedcity) {
        cityEL = $("<ul class='list-group-item active'>"+city+"</ul>");
    } else {
        cityEL = $("<ul class='list-group-item'>"+city+"</ul>");
    }
    $("#city-list").append(cityEL);
        }
    }   
}
getcities();


        
     

   













//function to get the weather data then take response and jsonify it
function getWeather(city) {
    var queryURL = weatherAPI + city + weatherAPIKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var weatherData = response;
        console.log(weatherData);
        displayWeather(weatherData);
    }
    )
}


