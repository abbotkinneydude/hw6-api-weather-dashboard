// JS Script for New France Weather Dashboard

// The document ready function ensures that no JS executes until the full html / css page is loaded.
$(document).ready(function(){
    
    // Consult moment js to import the exact date at which the page is consulted.
    // The moment js api is being loaded via a <script> at the bottom of index.html
    // I am specifying French language with the use of 'fr' within the moment parenthesis.
    // I use a var to extract the exact date, hour from the moment API.
    moment.locale('fr');
    var exactDate = moment().format("LLLL");
    console.log(exactDate); // For Testing Purpose
    // I'm using plain vanilla JS to access the <h5> in index.html
    // I then inject a string extracted from the var above.
    
    document.getElementById("realTime").textContent = exactDate;
    
    // Variable / array declaration to accumulate, retrieve city search history
    var cityAccumulator = [];
    
    // The variable 'search' is linked to the 'City Search Button'.
    // Two events listeners are added:
    // 1) To transmit the data to the 'getSearchInput' function via the event click.
    // 2) To retrieve 'City Search History' (if any) by forwarding to the 'storedCities' function
        
    var search = document.getElementById("citySearchButton");
    search.addEventListener("click", function() { getSearchInput(event) });
    search.addEventListener("click", function() { storedCities() });
        
    searchHistory();    // Call searchHistory function @ page load
    
    function storedCities() {
    var city = this[0].innerHTML;
    getWeather (city);
    };
                    
    function getSearchInput() {
        event.preventDefault();
        var city = document.querySelector(".searchBox").value;   // Create array of searched cities
        cityAccumulator.push(city); // Pushes new city into the array
        // Create string from searched cities in the searched cities array
        localStorage.setItem("cities", JSON.stringify(cityAccumulator));
        // Display Search History List 1 (prepend the latest search to the top of the list)
        var searchHistoryList1 = document.createElement("button");
        searchHistoryList1.innerHTML = city;
        document.getElementById("previousSearches").prepend(searchHistoryList1);
        getWeather(city);
    };
        
        // Search history is loop based to retrieve the previous cities from the 'cityAccumulator' array.
        // Create function to display cities search History stored in localStorage
        
    function searchHistory() {
        //Conversion string en objet avec JSON.parse
        cityAccumulator = JSON.parse(localStorage.getItem("cities"));
        // Use if else statements and for loop to initialise searchHistory based on search history
        if (cityAccumulator == null) { cityAccumulator = []; }
        // Boucle pour le tableau (array) des villes recherchées
        for (var i = 0; i < cityAccumulator.length; i++) {
            var displaySearchedCities = cityAccumulator[i];
            // Display List for prepending Search History List 2 (prepends below Search History List 1 for any previous history)
            var searchHistoryList2 = document.createElement("button");
            searchHistoryList2.textContent = displaySearchedCities;
            document.getElementById("previousSearches").prepend(searchHistoryList2);
        }
    };
    
    // Open Weather Map API AJAX CALL
    
    var apiKey = "e19a7227909c517ca48b30c9f8ec1bec";
    // Extract Current Weather from API
    
    function getWeather (city) {
    
        // Open Weather Map Query URL + specific API key
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
        
        // AJAX GET to retrieve JSON object with city weather information
            $.ajax({
                url: queryURL,
                method: "GET",
                dataType: "json",
                
                // Stocke toutes les données extraites dans un objet
                success: function(response){
                    
                    // Enregistre dans la console l'URL de recherche et l'objet qui en ressort
                    console.log(queryURL);
                    
                    // Extraction des dates
                    function date_format(dt_string){
                        var date = new Date(dt_string.dt*1000);
                        return date.toDateString();
                    }
                    
                    // Temperature : Celsius + Fahrenheit Calculations
                    function temp_trans(input){
                        var temp = ((input.main.temp- 273.15)).toFixed(2) + "C " +     //Celsius
                        ((input.main.temp- 273.15) * 1.80 + 32).toFixed(2) + "F";     //Fahrenheit
                        return temp;
                    }
                    
                    // Current Weather Display List
                    document.getElementById("previousSearches").empty;
                    var apiContent = response.list[0];
                    
                    // Current City + Date
                    document.getElementById("currentCity").textContent = response.city.name;
                    document.getElementById("cityDate").textContent = "Weather for " + date_format(apiContent);
                    console.log(response.city.name);
                    console.log(date_format(apiContent));
                    
                    // Large Weather Icon
                    var weatherIcon = document.createElement("img");
                    weatherIcon.src = "http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+"@4x.png";
                    var largeIcon = document.getElementById("weatherIcon");
                    largeIcon.innerHTML="";   // This is necessary to clear the previous occurence of the weather icon //
                    largeIcon.appendChild(weatherIcon);

                    // Current Temperature
                    var temperature = document.getElementById("temperature");
                    var tempLevel = temp_trans(apiContent);
                    temperature.textContent = "Temperature: " + tempLevel;

                    // Current Humidity
                    var humidity = document.getElementById("humidity");
                    var humidityLevel = apiContent.main.humidity;
                    humidity.textContent = "Humidity: " + humidityLevel + "%";

                    // Current Wind Speed
                    var windSpeed = document.getElementById("windSpeed");
                    var speedLevel = apiContent.wind.speed;
                    windSpeed.textContent = "Wind Speed: " + speedLevel + " mph";
    
                    // For the UV, I am executing the ultraviolet function to display the UV moniker.
                    ultraviolet(response.city.coord.lat, response.city.coord.lon);

                    function ultraviolet(lat,long) {
                        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "&lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
                        $.ajax({
                            url: queryURL,
                            method: "GET"
                        })
                        .then(function(responseUVI) {
                            var uvIndex = responseUVI.current.uvi;
                            var uvIcon = document.getElementById("uvLevel");
                            uvIcon.textContent = "UV Index: " + uvIndex;
                            console.log("UV Index: " + uvIndex); // For Testing Purpose

                            if (uvIndex <= 2.99) {uvIcon.style.backgroundColor = "#7f50ff"; uvIcon.style.color = "#ffffff";}
                            else if (uvIndex >= 3 && uvIndex <= 5.99) {uvIcon.style.backgroundColor = "#50ffd6"; uvIcon.style.color = "#000000";}
                            else if (uvIndex >= 6 && uvIndex <= 7.99) {uvIcon.style.backgroundColor = "#ffd650"; uvIcon.style.color = "#000000";}
                            else if (uvIndex >= 8) {uvIcon.style.backgroundColor = "#ff5079"; uvIcon.style.color = "#ffffff";}
                        });
                    };
                    
                    // 5 Day Forecast Display List
                    for(days=1; days<=5; days++){
                        apiContent= response.list[(days*8)-1];
                        
                        // Displays the dates of the next 5 days
                        document.getElementById("day" + days + "Forecast").textContent = date_format(apiContent);

                        // Displays the weather icon (small) of the next 5 days                                
                        var dayIcon = document.createElement("img");
                        dayIcon.src = "http://openweathermap.org/img/wn/"+apiContent.weather[0].icon+".png";
                        var smallIcon = document.getElementById("day" + days +"Icon");
                        smallIcon.innerHTML="";   // This is necessary to clear the previous occurence of the small weather icon
                        smallIcon.appendChild(dayIcon);

                        // Displays the Temperature, Humidity of the next 5 days
                        document.getElementById("day" + days + "Temperature").textContent = "Temperature: " + temp_trans(apiContent);
                        document.getElementById("day" + days + "Humidity").textContent = "Humidity: " + apiContent.main.humidity + "%";
                    }
                }
            }
            )
        };
        getWeather("Los Angeles"); // Displays Geolocalized Weather tailored to the user when page is first loaded
    }
    );

// End Weather JS File //