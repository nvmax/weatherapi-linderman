$(init);
// function init to get first item in local storage city list if nothing then set to Salt Lake City and send to getWeather
function init() {
    if (localStorage.getItem("cityList") === null) {
        $("#search-input").val("Salt Lake City");
        var city = "Salt Lake City";
        getWeather(city);
    }
    else {
        // get first item in local storage citylist and send to getWeather
        var cityList = JSON.parse(localStorage.getItem("cityList"));
        var city = cityList[0];
        getWeather(city);
    }
}

// https://openweathermap.org/api/one-call-api
// https://api.openweathermap.org/data/2.5/weather?q={city name}&units=imperial&appid={API key}
// For temperature in Fahrenheit and wind speed in miles/hour, use units=imperial
// weather api connection 
var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q="
var weatherAPIKey = "d12e589f389b69a0b72ac61ad3e26448"
var savedCity = "";
var loadedcity = "";
console.log(weatherAPI)

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function errorcall() {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// clear search-input on click 
$("#search-input").on("click", function () {
    $(this).val("");
}
);

// gets text from id="search-input" on btn-info click and pass value to logCity function
$(".btn-info").on("click", function (event) {
    event.preventDefault();
    // checks if input is empty else continues
    if ($("#search-input").val() === "") {
        // open modal       
        errorcall();
    } else {
        // get first city from localstorage and pass to search-input
        var city = $("#search-input").val();
        logCity(city);
        getcities(city);
        getWeather(city);

    }
});

// button event listener for city-save from local storage 
$("#city-save").on("click", ".city-button", function (event) {
    event.preventDefault();
    var city = $(this).attr("data-name");
    console.log(city);
    // working passing which button is clicked in list to console
    getWeather(city);
    getcities();

});



//function to log city name to local storage every time btn-info is clicked and append to list of cities 
// need function to see if its already in the list and if not add it
// may need to break out each cit into its own list item in storage
function logCity(city) {
    // clear items in city-list before adding new city
    $("#city-save").empty();
    var cityList = JSON.parse(localStorage.getItem("cityList"));
    if (cityList === null) {
        cityList = [];
    }
    if (cityList.indexOf(city) === -1) {
        cityList.push(city);
        localStorage.setItem("cityList", JSON.stringify(cityList));
    }
    console.log(cityList);
    getcities(cityList);

}




// function to parse data from local storage city list
function getcities() {
    $("#city-save").empty();
    // if local storage is empty, return empty array
    if (localStorage.length === 0) {
        // store value from search-input in local storage with value of citylist if not empty append to list
        var cityList = JSON.parse(localStorage.getItem("cityList"));
        if (cityList === null) {
            cityList = [];
        }
        console.log(cityList);
        getWeather(city);

    } else {
        // need to get city written fom local storage
        // using info from scott casey from class, still not working
        // issue maybe from using city-list instead of key of storagelist
        // rewrote section below to parse each item from citylist

        var cityList = JSON.parse(localStorage.getItem("cityList"));
        // set search-input to first city in local storage 
        $("#search-input").val(cityList[0]);
        console.log(cityList);
        for (var i = 0; i < cityList.length; i++) {
            var city = cityList[i];
            console.log(city); // each are listed individually
            // create buttons for each item in city and append to city-save <ul>
            var cityButton = $("<button>");
            cityButton.addClass("city-button");
            cityButton.attr("data-name", city);
            cityButton.text(city);
            // change width of cityButton to fit in city-list
            cityButton.css("width", "auto");
            cityButton.css("color", "black");
            $("#city-save").append(cityButton);

        }
    }
}
getcities();


// function to get current weather for city

function getWeather(city) {
    let queryURL = weatherAPI + city + "&units=imperial&appid=" + weatherAPIKey;
    console.log(queryURL);
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
            var WeatherIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var WeatherHTML = `
        <h3>${response.name} ${nowMoment}<img src="${WeatherIcon}"></h3>
        <ul class="list">
            <li>Temp: ${temp}&#8457;</li>
            <li>Wind: ${windSpeed} mph</li>
            <li>Humidity: ${humidity}%</li>
            <li id="uvIndex">UV-Index: </li>
        </ul>`;
            $('#current-weather').html(WeatherHTML);

            // need uvi options and values 
            var lat = response.coord.lat;
            console.log(lat); // returns 36.175
            var lon = response.coord.lon;
            fiveDay(lon, lat)
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
                    $("#uvI").css("padding-left", `${uvIndex * 2}px`); 
                    $("#uvI").css("padding-right", `${uvIndex * 2}px`);
                    // used info below to compair number for great than to less than and vice versa
                    // https://stackoverflow.com/a/8236858/6238337
                    if (uvIndex >= 0 && uvIndex < 2) {
                        $("#uvI").attr("class", "uvLow");
                    } else if (uvIndex >= 2 && uvIndex < 5) {
                        $("#uvI").attr("class", "uvModerate");
                    } else if (uvIndex >= 5 && uvIndex < 7) {
                        $("#uvI").attr("class", "uvHigh");
                    } else if (uvIndex >= 7 && uvIndex < 10) {
                        $("#uvI").attr("class", "uvVeryhigh");
                    } else if (uvIndex >= 10 && uvIndex < 17) {
                        $("#uvI").attr("class", "uvExtrme");
                        // now working.
                    }
                })
        })
        )
}
// 5 day forcast  need to city sent into it
// Thanks to Scott Casey for helping me with this section using onecall and getting day.temp.max
var fiveDay = (lon, lat) => {
    console.log(lon);
    console.log(lat);
    $("#five-day").empty();
    console.log(lon, lat);
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&units=imperial&lon=" + lon + "&appid=" + weatherAPIKey;
    console.log(queryURL);
    fetch(queryURL)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            // creates html elements under five-day using date and temp.max and humidy with weather icon // thanks scott for helping me with this section on day.temp.max
            let WeatherHTML = `
                <h2>5-Day Forecast:</h2>
                <div id="fiveday" class="d-inline-flex flex-wrap">`;
            var fiveDay = response.daily;
            console.log(fiveDay);
            for (var i = 1; i < 6; i++) {
                var day = fiveDay[i];
                console.log(day);
                var dayMoment = moment.unix(day.dt).format("MM/DD/YYYY");
                console.log(dayMoment);
                var temp = day.temp.max;
                console.log(temp);
                var windSpeed = day.wind_speed;
                console.log(windSpeed);
                var humidity = day.humidity;
                console.log(humidity);
                var weatherIcon = day.weather[0].icon;
                console.log(weatherIcon);
                var WeatherIcon = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
                // if all data is retrieved then create weatherHTML elements
                if (dayMoment && temp && humidity && weatherIcon) {
                    WeatherHTML += `
                        <div class="card m-2">
                            <div class="card-body">
                                <h5 class="card-title">${dayMoment}</h5>
                                <img src="${WeatherIcon}">
                                <p class="card-text">Temp: ${temp}&#8457;</p>
                                <p class="card-text">Wind: ${windSpeed} mph</p>                               
                                <p class="card-text">Humidity: ${humidity}%</p>
                            </div>
                        </div>`;
                }
            }
            $('#five-day').append(WeatherHTML);
        })
}






















