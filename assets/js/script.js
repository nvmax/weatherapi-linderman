


// https://openweathermap.org/api/one-call-api

// https://api.openweathermap.org/data/2.5/weather?q={city name}&units=imperial&appid={API key}
// For temperature in Fahrenheit and wind speed in miles/hour, use units=imperial

// weather api connection 
var weatherAPI= "https://api.openweathermap.org/data/2.5/weather?q="
var weatherAPIKey = "&appid=d12e589f389b69a0b72ac61ad3e26448"
var savedCity ="";
var loadedcity = "";
console.log(weatherAPI)





// gets text from id="search-input" on btn-info click and pass value to logCity function
$(".btn-info").on("click", function(event) {
    event.preventDefault();
    var city = $("#search-input").val();
    logCity(city);
    getWeather(city);
}
)
// button event listener for city-save from local storage 
$("#city-save").on("click", ".city-button", function(event) {
    event.preventDefault();
    var city = $(this).attr("data-name");
    console.log(city);
    // working passing which button is clicked in list to console
    getWeather(city);
})



//function to log city name to local storage every time btn-info is clicked and append to list of cities 
// need function to see if its already in the list and if not add it
// may need to break out each cit into its own list item in storage
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
            $("search-input").attr("value", "Minneapolis"); // not working not sure why!
        }
    }else {
        // need to get city written fom local storage
        // using info from scott casey from class, still not working
        // issue maybe from using city-list instead of key of storagelist
        // rewrote section below to parse each item from citylist
        var cityList = JSON.parse(localStorage.getItem("cityList"));
        console.log(cityList); // (3) ['Las Vegas', 'Minneapolis ', 'salt lake city']
        for (var i = 0; i < cityList.length; i++) {
            var city = cityList[i];
            console.log(city); // each are listed individually
            // create buttons for each item in city and append to city-save <ul>
            var cityButton = $("<button>");
            cityButton.addClass("city-button");
            cityButton.attr("data-name", city);
            cityButton.text(city);
            // change width of cityButton to fit in city-list
            cityButton.css("width", "150px");
            $("#city-save").append(cityButton);         

        }
    }
}
getcities();


// function to get current weather for city

var getWeather = (city) => {
    let queryURL = weatherAPI + city +"&units=imperial"+ weatherAPIKey;
    console.log(queryURL); // logs https://api.openweathermap.org/data/2.5/weather?q=Las Vegas&appid=d12e589f389b69a0b72ac61ad3e26448 and shows it is requesting right.
    fetch(queryURL)
    
    .then(response => {
        return response.json();
})
    .then((response => {
        console.log(response);
        // need time 
        var nowtime = response.dt;
        console.log(nowtime); // 1658509568 response  seems to be unix timestamp need to convert to time
        var nowMoment = moment.unix(nowtime).format("MM/DD/YYYY");
        console.log(nowMoment); // nothing shows up
    
    
    
    
    
        //  https://stackoverflow.com/a/70418266/6238337

    //    var date = d.toISOString();
    //    var targetTime = new Date(date);
    //    var timeZoneFromDB = offset; //time zone value from database
    //    //get the timezone offset from local time in minutes
    //    var tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset();
    //    //convert the offset to milliseconds, add to targetTime, and make a new Date
    //    var offsetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
    //    return offsetTime;
    //  } 
        


        // gets response -- current log updated with imperial units 
        // {coord: {…}, weather: Array(1), base: 'stations', main: {…}, visibility: 10000, …}
        // base: "stations"
        // clouds:
        // all: 0
        // [[Prototype]]: Object
        // cod: 200
        // coord:
        // lat: 36.175
        // lon: -115.1372
        // [[Prototype]]: Object
        // dt: 1658445999
        // id: 5506956
        // main:
        // feels_like: 106.43
        // humidity: 9
        // pressure: 1007
        // temp: 112.35
        // temp_max: 114.28
        // temp_min: 108.82
        // [[Prototype]]: Object
        // name: "Las Vegas"
        // sys:
        // country: "US"
        // id: 6171
        // sunrise: 1658407141
        // sunset: 1658458472
        // type: 1
        // [[Prototype]]: Object
        // timezone: -25200
        // visibility: 10000
        // weather: Array(1)
        // 0: {id: 800, main: 'Clear', description: 'clear sky', icon: '01d'}
        // length: 1
        // [[Prototype]]: Array(0)
        // wind:
        // deg: 210
        // gust: 24.16
        // speed: 16.11
        // [[Prototype]]: Object
        // [[Prototype]]: Object
    }
    )   
    )
}
