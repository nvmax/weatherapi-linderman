


// https://openweathermap.org/api/one-call-api

// https://api.openweathermap.org/data/2.5/weather?q={city name}&units=imperial&appid={API key}
// For temperature in Fahrenheit and wind speed in miles/hour, use units=imperial

// weather api connection 
var weatherAPI= "https://api.openweathermap.org/data/2.5/weather?q="
var weatherAPIKey = "d12e589f389b69a0b72ac61ad3e26448"
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
    let queryURL = weatherAPI + city +"&units=imperial&appid="+ weatherAPIKey;
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
            // Garrett Lockhart
            // moment.unix(value).format("MM/DD/YYYY");
        var nowMoment = moment.unix(nowtime).format("MM/DD/YYYY");
        console.log(nowMoment); // now gets current date
        // need to create html elements for temp, weather icon, humidity, wind speed, and UV index
        var temp = response.main.temp;
        console.log(temp); // temp is in fahrenheit
        var humidity = response.main.humidity;
        console.log(humidity); // humidity is in percent
        var windSpeed = response.wind.speed;
        console.log(windSpeed); // wind speed is in miles per hour
        var uvIndex = response.uvi;
        console.log(uvIndex); // undefined  because uv index is not in response need to create a call to https://api.openweathermap.org/data/2.5/uvi
        var weatherIcon = response.weather[0].icon;
        console.log(weatherIcon); // 01d - need to add this to the img tag and .png to the end
        var WeatherIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var WeatherHTML = `
        <h3>${response.name} ${nowMoment}<img src="${WeatherIcon}"></h3>
        <ul class="list">
            <li>Temperature: ${temp}&#8457;</li>
            <li>Humidity: ${humidity}%</li>
            <li>Wind Speed: ${windSpeed} mph</li>
            <li id="uvIndex">UV-Index: </li>
        </ul>`;
        $('#current-weather').html(WeatherHTML);

        // need uvi options and values 
        var lat = response.coord.lat;
        console.log(lat); // returns 36.175
        var lon = response.coord.lon;
        console.log(lon); // returns -115.1372
        //var weatherAPIKey = "d12e589f389b69a0b72ac61ad3e26448"
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + weatherAPIKey + "&lat=" + lat + "&lon=" + lon;
        console.log(uvURL); 
        fetch(uvURL)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then((response) => {
            let uvIndex = response.value;
            console.log(uvIndex);
            // https://www.geeksforgeeks.org/jquery-change-the-text-of-a-span-element/  set content
            // https://stackoverflow.com/q/52917041/6238337
            // using https://www.epa.gov/sites/default/files/documents/uviguide.pdf to get uv index values
            $("#uvIndex").html(`UV-Index: <span id="uvI"> ${uvIndex}</span>`);
            // need to figure out how to compaire less than number but greater than number 
                // https://stackoverflow.com/a/8236858/6238337
            if (uvIndex < 2) {
                $("#uvI").attr("class", "uvLow");
            } else if (uvIndex <= 5) {
                $("#uvI").attr("class", "uvModerate");
            } else if (uvIndex <= 7) {
                $("#uvI").attr("class", "uvHigh");
            } else if (uvIndex >= 10) {
                $("#uvI").attr("class", "uvVeryhigh");
            } else if (uvIndex >= 11) {
                $("#uvI").attr("class", "uvExtrme");
                // some work some dont anything 10 is not working 
            }

           
        
        })
    }))

}

