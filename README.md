# hw6-api-new-france-weather-dashboard
*** New France Weather Dashboard optimized for mobile devices (Skeleton CSS).***

Github Repository Page: https://github.com/abbotkinneydude/hw6-new-france-api-weather-dashboard
Github Deployment Page: https://abbotkinneydude.github.io/hw6-new-france-api-weather-dashboard/

**Reminder: please insert the API key sent to you via Slack before reviewing. Otherwise the application will not function.**


<u>Overview:</u>

• Weather Dashboard based on city name search with input field.
• Displays current weather conditions based on search query.
• Also displayed is the weather forecast for the next 5 days based on the same search query.
• Each search query is added to the search history and is retrievable with a simple button click.
• At page refresh, the dashboard will display the weather from the last search query (prior to refresh).


<u>Details:</u>

<i>Weather Conditions for main window are:</i>
	- City Name
	- Date
	- Icon Representation of Weather Conditions
	- Temperature (Celsius / Fahrenheit)
	- Humidity
	- Wind speed
	- UV index -> a differenc color is associated to each level of the UV index (from moderate to severe).
	
<i>Weather Conditions for 5 days forecast are:</i>
	- Date
	- Icon Representation of Weather Conditions
	- Temperature (Celsius / Fahrenheit)
	- Humidity



<u>Instructions:</u>

- Enter valid city name in the search box to search for the weather for said city.

- Displayed on screen will be be the current weather and weather forecast for the next 5 days for said city.

- On the left side of the weather condition are displayed yellow active buttons which contain the search history.

- Click on any of those yellow buttons to retrieve the weather condition for the city name associated to that button.

- At page refresh, the current weather conditions will display the last city searched prior to refresh.

- If you want the search history to show after a page refresh, please uncomment function searchHistory().


*Refer to weather.js (javascript file) for code dissection.*

## Reference

Skeleton CSS Library [http://getskeleton.com/] *Lightweight alternative to Bootstrap*

Moment.js Library [https://momentjs.com/] *Used to retrieve date & time for header*

Open Weather Map API [https://openweathermap.org/api] *HTTP Get Request returns a JSON object containing weather data*

Standard Javascript for logic [https://en.wikipedia.org/wiki/JavaScript]

Jquery Library [https://jquery.com/] *Used mostly for the AJAX Calls*

Local Storage to store search history.