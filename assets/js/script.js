$(init);

function init() {
    // 
    
}



// https://openweathermap.org/api/one-call-api

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// weather api connection 
var weatherAPI= "https://api.openweathermap.org/data/2.5/weather?q="
var weatherAPIKey = "&appid=d12e589f389b69a0b72ac61ad3e26448"
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



// $("#search-input").on("keyup", function(event) {
//     event.preventDefault();
//     var city = $("#search-input").val();
//     logCity(city);

// }
// )




//function to log city name to local storage every time btn-info is clicked and append to list of cities
function logCity(city) {
    var cityList = JSON.parse(localStorage.getItem("cityList"));
    if (cityList === null) {
        cityList = [];
    }
    cityList.push(city);
    localStorage.setItem("cityList", JSON.stringify(cityList));
}


// function to parse data from local storage city list
function getCityList() {
    var cityList = JSON.parse(localStorage.getItem("cityList"));
    if (cityList === null) {
        cityList = [];
    }
    // create a button for each item in array and append to <li></li> div in html
    for (var i = 0; i < cityList.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-info");
        button.attr("data-name", cityList[i]);
        button.text(cityList[i]);
        $("#li").append(button);
    }
}

   













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


