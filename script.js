// 5 day weather forecast
//set href's for a few common cities

$(document).ready(function () {
  var queryUrl;
  var queryUV;
  var queryFive;
  var lat;
  var long;
  var city;

  let searchHistory = [];

  //keyup on search input tag for city
  var cityInput = $("#city-input").keyup(function () {
    var value = $(this).val();
    city = value;
    queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=61db461bd021f2b15d8d849b1dfb3b9a`;
  });
  ////// Clear Button
  $("#clear-hist").on("click", function () {
    localStorage.removeItem("city-input");
    // location.reload();
  });
  $("#search-button").click(function (e) {
    e.preventDefault();

    //Local storage of Cities' searched
    console.log(searchHistory);
    let cities = city;
    searchHistory.push(cities);
    localStorage.setItem("city-input", searchHistory);

    ///getting searchHistory from local storage

    let lastSearched = localStorage.getItem("city-input");
    console.log(lastSearched);

    for (var i = 0; i < searchHistory.length; i++) {
      const searchItem = $("#searchHistory");
      searchItem.append(`<li
                id="city-hist1"
            class="list-group-item "
              ><a href="#">
                ${searchHistory[i]}
            </a></li>`);
    }

    ////AJAX for 1st weather call ////////
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      // console.log(response); //this is our city object with data
      // console.log(response.weather);
      // Weather ICON
      var weatherIcon = response.weather
        .map(function (index) {
          return index.icon;
        })
        .toString();

      var iconUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
      $("#iconUrl").attr("src", iconUrl);

      // CITY NAME
      var cityName = "City: " + response.name;
      $("#city-name").text(cityName);
      //Current Date and Time
      var currentDate = moment().format("MMMM Do YYYY");
      $("#current-date").text(currentDate);
      //TEMP in F
      var tempF =
        "Temperature(˚F): " +
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
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
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
        // console.log(responseTwo);
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

    // Ajax call for 5 day Weather Forecast
    queryFive = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=61db461bd021f2b15d8d849b1dfb3b9a`;
    $.ajax({
      url: queryFive,
      method: "GET",
    }).then(function (res) {
      // console.log(res); //5 day forecast object for indexing
      // Day 1
      $("#date1").append(`Date: ${res.list[0].dt_txt}`);
      $("#img1").attr(
        "src",
        `https://openweathermap.org/img/w/${res.list[0].weather[0].icon}.png`
      );
      $("#temp1").append(
        `${((res.list[0].main.temp - 273.15) * 1.8 + 32).toFixed(2)}`
      );
      $("#humid1").append(`${res.list[0].main.humidity}%`);
      ////
      // Day 2
      $("#date2").append(`Date: ${res.list[7].dt_txt}`);
      $("#img2").attr(
        "src",
        `https://openweathermap.org/img/w/${res.list[7].weather[0].icon}.png`
      );
      $("#temp2").append(
        `${((res.list[7].main.temp - 273.15) * 1.8 + 32).toFixed(2)}`
      );
      $("#humid2").append(`${res.list[7].main.humidity}%`);
      // Day 3
      $("#date3").append(`Date: ${res.list[15].dt_txt}`);
      $("#img3").attr(
        "src",
        `https://openweathermap.org/img/w/${res.list[15].weather[0].icon}.png`
      );
      $("#temp3").append(
        `${((res.list[15].main.temp - 273.15) * 1.8 + 32).toFixed(2)}`
      );
      $("#humid3").append(`${res.list[15].main.humidity}%`);
      ////
      // Day 4
      $("#date4").append(`Date: ${res.list[23].dt_txt}`);
      $("#img4").attr(
        "src",
        `https://openweathermap.org/img/w/${res.list[23].weather[0].icon}.png`
      );
      $("#temp4").append(
        `${((res.list[23].main.temp - 273.15) * 1.8 + 32).toFixed(2)}`
      );
      $("#humid4").append(`${res.list[23].main.humidity}%`);
      ////
      // Day 5
      $("#date5").append(`Date: ${res.list[31].dt_txt}`);
      $("#img5").attr(
        "src",
        `https://openweathermap.org/img/w/${res.list[31].weather[0].icon}.png`
      );
      $("#temp5").append(
        `${((res.list[31].main.temp - 273.15) * 1.8 + 32).toFixed(2)}`
      );
      $("#humid5").append(`${res.list[31].main.humidity}%`);
    });
  });
});
