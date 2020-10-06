// 5 day weather forecast
//set href's for a few common cities

$(document).ready(function () {
  var queryUrl;
  var queryUV;
  var lat;
  var long;
  var searchHistory = [];

  //keyup on search input tag for city
  var cityInput = $("#city-input").keydown(function () {
    var value = $(this).val();
    console.log(value);
    localStorage.setItem("city-input", value);
    var getCity = localStorage.getItem("city-input");
    searchHistory.push(getCity);
    console.log(getCity);
    console.log(searchHistory);
    // pTag = $("#city-one").append("<p>");
    // pTag.text(searchHistory);
    queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=61db461bd021f2b15d8d849b1dfb3b9a`;
  });

  //Getting item from local storage + button to insert value into city-input

  // City Search Buttoneventlistener
  $("#search-button").click(function () {
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response); //this is our city object with data
      console.log(response.weather);
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
      console.log(lat);
      //Longitude
      long = response.coord.lon;
      console.log(long);
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
