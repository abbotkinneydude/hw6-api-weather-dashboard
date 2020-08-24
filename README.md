<strong>#hw6-api-new-france-weather-dashboard</strong>

<p><strong>New France Weather Dashboard optimized for mobile devices (Skeleton CSS).</strong></p>

<p>Github Repository Page: https://github.com/palowenstein/hw6-new-france-api-weather-dashboard</p>

<p>Github Deployment Page: https://palowenstein.github.io/hw6-new-france-api-weather-dashboard/</p>

<p><strong>Reminder: please insert the API key sent to you via Slack before reviewing. Otherwise the application will not function.</strong></p>


![New France Weather Dashboard (Screenshot)](./assets/img/ucla-hw6-new-france-weather-dashboard.jpg?raw=true "New France Weather Dashboard (Screenshot)")


## Overview:

<ul>
<li>Weather Dashboard based on city name search with input field.</li>
<li>Displays current weather conditions based on search query.</li>
<li>Also displayed is the weather forecast for the next 5 days based on the same search query.</li>
<li>Each search query is added to the search history and is retrievable with a simple button click.</li>
<li>At page refresh, the dashboard will display the weather from the last search query (prior to refresh).</li>
</ul>

## Details:

<i>Weather Conditions for main window are:</i><br />
<ol>
<li>City Name</li>
<li>Date</li>
<li>Icon Representation of Weather Conditions</li>
<li>Temperature (Celsius / Fahrenheit)</li>
<li>Humidity</li>
<li>Wind speed</li>
<li>UV index (color based condition dependent)</li>
</ol>

<i>Weather Conditions for 5 days forecast are:</i><br />
<ol>
<li>Date</li>
<li>Icon Representation of Weather Conditions</li>
<li>Temperature (Celsius / Fahrenheit)</li>
<li>Humidity</li>
</ol>


## Instructions:
<ul>
<li>Enter valid city name in the search box to search for the weather for said city.</li>
<li>Displayed on screen will be be the current weather and weather forecast for the next 5 days for said city.</li>
<li>On the left side of the weather condition are displayed yellow active buttons which contain the search history.</li>
<li>Click on any of those yellow buttons to retrieve the weather condition for the city name associated to that button.</li>
<li>At page refresh, the current weather conditions will display the last city searched prior to refresh.</li>
<li>If you want the search history to show after a page refresh, please uncomment function searchHistory().</li>
</ul>

<p><i>Refer to weather.js (javascript file) for code dissection.<i></p>

## References

<ul>
<li>Skeleton CSS Library [http://getskeleton.com/] *Lightweight alternative to Bootstrap*</li>
<li>Moment.js Library [https://momentjs.com/] *Used to retrieve date & time for header*</li>
<li>Open Weather Map API [https://openweathermap.org/api] *HTTP Get Request returns a JSON object containing weather data*</li>
<li>Standard Javascript for logic [https://en.wikipedia.org/wiki/JavaScript]</li>
<li>Jquery Library [https://jquery.com/] *Used mostly for the AJAX Calls*</li>
<li>Local Storage to store search history.</li>
</ul>

 ## The MIT License (MIT)

<p>Copyright © 2020 Pierre André Lowenstein</p>

<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>

<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>

<p>THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
