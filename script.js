// 5 day weather forecast
//set href's for a few common cities

$(document).ready(function () {
  var queryUrl;
  var queryUV;
  var cityValue;
  var lat;
  var lon;
  var searchHistory = [];

  //keyup on search input tag for city
  http: var cityInput = $("#city-input").keyup(function () {
    var value = $(this).val();
    console.log(value);
    //Setting city-input to local storage
    cityValue = localStorage.setItem("#city-input", value);
    searchHistory = JSON.parse(localStorage.getItem("#city-input"));
    queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=61db461bd021f2b15d8d849b1dfb3b9a`;
  });

  //Getting item from local storage + button to insert value into city-input
  $("#searchHistory").click(function () {
    $("#city-input").text(searchHistory);
  });

  // City Search Buttoneventlistener
  http: $("#search-button").click(function () {
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
      //Lat & Long
      lat = response.coord.lat;
      console.log(lat);
      lon = response.coord.lon;
      console.log(long);
      var queryUV = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=61db461bd021f2b15d8d849b1dfb3b9a`;
      //   Ajax use for UV Index
      $.ajax({
        url: queryUV,
        method: "GET",
      }).then(function (task) {
        console.log(task.data[0].value);
      });
    });
  });
});
