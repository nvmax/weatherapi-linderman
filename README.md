# weatherapi-Jerrod Linderman
<div id="header" align="center">
  <img src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif" width="100"/>
</div>
<div align="center">
 Jerrod Linderman
</div>
<div align="center">
<img src="https://komarev.com/ghpvc/?username=nvmaxx&style=flat-square&color=blue" alt=""/>
</div>

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```


## Application
```
Daily weather and forcast 

User inputs city they wish, they can either click enter on keyboard or click search button

Logs the city to localstorage and creates a button on the left side for persistance.

User can add multiple cities to list when user clicks on the button again it will load information on that city.

When user clicks with in the search field it will clear out city that is in there allowing them to type in a new city.

If no city is input and the field is blank, a modal will pop up asking to input a city.

Once a city is entered the daily forcast will display showing the city name and current date with icon, temp, wind speed, humidity and uv-index

5 day forcast is also loaded in individual cards for each of the 5 days, with Date, Icon, Temp, Wind and Humidity.
```

![](/assets/images/Weatherapi.png)
![](/assets/images/modal.png)

repo: https://github.com/nvmax/weatherapi-linderman

deployed site: https://nvmax.github.io/weatherapi-linderman/