


// https://openweathermap.org/api/one-call-api

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

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
            $("search-input").attr("value", "Minneapolis");
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
            var listItem = $("<ul>");
            listItem.text(city);
            listItem.attr("class", "list-group-item");
            listItem.attr("id", "city-save");
            $("#city-save").append(listItem); // works but not in button format
        }
    }
}






    
    //  var lastcityitem = "cityList"+(localStorage.length-1);
    //  console.log(lastcityitem); // logging citylist0 I think it is due to the way the array is stored in local storage instead of breaking each one out
    //  lastCity = localStorage.getItem(lastcityitem);
    //  console.log(lastCity); // logging null 

    //  $("#search-input").attr("value", lastCity);
    //     console.log(lastCity); // null 

    //  for (let i=0; i < localStorage.length; i++) {
    //     var city  = localStorage.getItem("cityList"+i);
    //     var cityEl;
    //     console.log(city); // null 
    //     console.log(cityEl); // undefined
    // if (loadedcity === "") {
    //     loadedcity = lastCity;
    // } 
    // if (city === loadedcity) {
    //     cityEl = $("<ul class='list-group-item active'>"+city+"</ul>");
    // } else {
    //     cityEl = $("<ul class='list-group-item'>"+city+"</ul>");
    // }
    // $("#city-save").append(cityEl); // fixed this had city list instead of city save still varialbles are null.
//         }
//     }   
// }
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


