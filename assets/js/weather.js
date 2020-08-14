// JS Script for New France Weather Dashboard

$(document).ready(function(){ // ensures that no JS executes until full html/css is loaded
    
    var search = document.getElementById("citySearchButton");  // variable associated with the search button   
    search.addEventListener("click", function() { getSearchInput (event) }); // sends to string retrieval function
    search.addEventListener("click", function() { getWeather (storedCities); }); // runs the  get weather for previously searched queries
    var cityAccumulator = []; // Array to store the accumulated cities during search
    var storedCities = $(this)[0].innerHTML; // HTML injection for cities accumulated during search


    // Header Section
    var exactDate = moment().format("LLLL"); // Date Format for Moment JS in Main Header
    moment.locale('fr'); // Consult Moment API (French language) to extract current date & time
    console.log("(this computer) Current Time Zone Date & Hour (French): " + exactDate); // For Testing Purpose
    document.getElementById("realTime").textContent = exactDate; // Current date & time are injected in the main header via #ID
    
    searchHistory();    // Runs the Search History function to generate buttons (left column) of previous searches stored in local storage 

    function getSearchInput() {
        event.preventDefault();
        var city = document.querySelector(".searchBox").value;   // Extracts name value from Search Box     
        if ( !city ) {
            alert("Cannot accept an empty input field"); // Alerts user if empty input field
        }   
        else {
            cityAccumulator.push(city); // Adds city name to the 'city accumulator' array
            localStorage.setItem("cities", JSON.stringify(cityAccumulator)); // Stores the current search in local storage
            var searchHistoryList1 = document.createElement("button"); // Creates a button (left column) to store current search query
            searchHistoryList1.textContent = city; // assigns current city name query to button
            document.getElementById("previousSearches").prepend(searchHistoryList1); // Prepends Search History age
            document.querySelector(".searchBox").value = ""; // Clears the input field after search query is submitted
            getWeather(city); // Sends city name to get weather function to generate weather chart
        }
    };
        
    function searchHistory() {
        cityAccumulator = JSON.parse(localStorage.getItem("cities"));  // Retrieves City names from local storage
        // Checks if the city array has reached 20: if below 20, adds search history, 20 or above, sends to else: clears array to make space for new searches
        if ( cityAccumulator == null || cityAccumulator >= 5 ) { cityAccumulator = []; }
            // City Accumulator Ascending iterator
            for (var i = 0; i < cityAccumulator.length; i++) {
            // Display List for prepending Search History List 2 (prepends below Search History List 1 for any previous history)
            var searchHistoryList2 = document.createElement("button");
            searchHistoryList2.textContent = cityAccumulator[i];
            document.getElementById("previousSearches").prepend(searchHistoryList2); }
            };


    var apiKey = ""; // Global API Key for Open Weather Map API
  
    // Main Retrieval Function
    function getWeather (city) {
    
        // Open Weather Map Query URL + specific API key
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?onecall?&q=" + city + "&appid=" + apiKey;
        
        // AJAX GET to retrieve JSON object with city weather information
        
     //   $(document).ajaxSuccess(function() {

            $.ajax({
                type: "GET",
                url: queryURL,
                dataType: "json"
            })

                .done(function(response) {

                    // Copy of the queryURL pushed to the console
                    console.log(queryURL);
                    
                    // Date Extraction
                    function weatherDate(getDestinationTime){
                        var date = new Date(getDestinationTime.dt*1000);
                        var timeOfTheDay = new Date(getDestinationTime.list);
                        return date+timeOfTheDay.toDateString();
                    }
                    
                    // Temperature : Celsius + Fahrenheit Calculations
                    function temp_trans(input){
                        var temp = ((input.main.temp- 273.15)).toFixed(2) + "C " +     //Celsius
                        ((input.main.temp- 273.15) * 1.80 + 32).toFixed(2) + "F";     //Fahrenheit
                        return temp;
                    }
                    
                    // Variable to contain JSON object received from Open Weather Map API
                    var apiContent = response.list[0];
                    
                    // Current City + Date
                    document.getElementById("currentCity").textContent = response.city.name;
                    document.getElementById("cityDate").textContent = "Weather for " + weatherDate(apiContent);
                    console.log("Current City: " + response.city.name);
                    console.log("Weather dated: " + weatherDate(apiContent));
                    
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
                    console.log("Temperature: " + temp_trans(apiContent));

                    // Current Humidity
                    var humidity = document.getElementById("humidity");
                    var humidityLevel = apiContent.main.humidity;
                    humidity.textContent = "Humidity: " + humidityLevel + "%";
                    console.log("Humidity: " + apiContent.main.humidity);

                    // Current Wind Speed
                    var windSpeed = document.getElementById("windSpeed");
                    var speedLevel = apiContent.wind.speed;
                    windSpeed.textContent = "Wind Speed: " + speedLevel + " mph";
                    console.log("Wind Speed: " + apiContent.wind.speed);                    
    
                    // For the UV, I am executing the ultraviolet function to display the UV moniker.
                    ultraviolet(response.city.coord.lat, response.city.coord.lon);
                    console.log("Current City Latitude: " + response.city.coord.lat + " Longitude: " + response.city.coord.lon);

                    // UV Level Retrieval Function
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
                        document.getElementById("day" + days + "Forecast").textContent = weatherDate(apiContent);

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

                } // End success: function(response)
                
                .fail(function (jqXHR, textStatus, errorThrown) {
                  if (jqXHR.status == 400 || jqXHR.status == 401 || jqXHR.status == 402 || jqXHR.status == 403 || jqXHR.status == 404 || jqXHR.status == 405 || jqXHR.status == 406)
                  {
                    alert("Error #" + jqXHR.status + ". This is not a valid entry." + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
                }
            })


        )
   // }
    ); // End AJAX Call

    };  // End Get Weather Function

        getWeather("Los Angeles") // Displays Los Angeles Weather tailored to the user when page is first loaded

});