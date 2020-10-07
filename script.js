// 5 day weather forecast
//set href's for a few common cities

$(document).ready(function () {
  var queryUrl;
  var queryUV;
  var lat;
  var long;
  var city;
  var searchHistory = [];

  //keyup on search input tag for city
  var cityInput = $("#city-input").keyup(function () {
    var value = $(this).val();
    city = value;

    queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=61db461bd021f2b15d8d849b1dfb3b9a`;
  });
  console.log(searchHistory, "history outside");
  //Getting item from local storage + button to insert value into city-input

  $("#search-button").click(function () {
    //Local storage of Cities' searched
    var getCity = localStorage.getItem("city-input");
    searchHistory.push(city);
    localStorage.setItem("city-input", searchHistory);
    console.log(getCity, "get city from input");
    console.log(searchHistory, "last searched"); //this is our array
    var newP = $("#city-search").append("<p>");
    newP.text(getCity);

    //loop through storage
    for (i = 0; i < searchHistory.length; i++) {
      var cityBtn = $("<button>");
      console.log(cityBtn);
      cityBtn.text(searchHistory[i++]);
      $("#list-example").html(cityBtn);
    }

    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response); //this is our city object with data
      console.log(response.weather);
      // Weather ICON
      var weatherIcon = response.weather
        .map(function (index) {
          return index.icon;
        })
        .toString();

      var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
      $("#iconUrl").attr("src", iconUrl);

      // CITY NAME
      var cityName = "City: " + response.name;
      $("#city-name").text(cityName);
      //Current Date and Time
      var currentDate = moment().format("MMMM Do YYYY");
      $("#current-date").text(currentDate);
      //TEMP in F
      var tempF =
        "Temperature(F): " +
        ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2);
      $("#temperature").text(tempF);
      // HUMIDIITY
      var cityHumidity = "Humidity: " + response.main.humidity;
      $("#humidity").text(cityHumidity);
      // WIND SPEED
      var windSpeed = "Wind: " + response.wind.speed + " mph";
      $("#wind-speed").text(windSpeed);
      //Latitude
      lat = response.coord.lat;

      //Longitude
      long = response.coord.lon;

      queryUV =
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&" +
        "lon=" +
        long +
        "&appid=61db461bd021f2b15d8d849b1dfb3b9a";
      // Ajax request (UV w/lat and long)
      $.ajax({
        url: queryUV,
        method: "GET",
      }).then(function (responseTwo) {
        //UV index
        var uvIndex = "UV Index: " + responseTwo.value;
        console.log(responseTwo);
        $("#UV-index").text(uvIndex);

        var indexDiv = $("#index-div");
        if (uvIndex >= 7) {
          indexDiv.css("background-color", "red");
        } else if (uvIndex >= 4) {
          indexDiv.css("background-color", "yellow");
        } else {
          indexDiv.css("background-color", "green");
        }
      });

      // button to clear history
      $("#clearHistory").click(function () {
        window.localStorage.clear();
      });
    });
  });
});
