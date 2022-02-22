//var city="";
//var searchCity = $("#search-city");
//var searchButton = $("#search-button");
//var clearButton = $("#clear-history");
//var currentCity = $("#current-city");


var cityInput = document.querySelector("#cityInput");
var apiKey ="3ce875e0ba8303fb256a40a259c43bc5";

var listLimit = 0;
var alreadyAdded = [];

$("#current-date").text(moment().format("MM/DD/YYYY"));

var cityCurrent = function (cityLat, cityLon) {
    var currentWeatherURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" +  cityLon +  "&exclude=minutely&exclude=hourly&exclude=alerts" + "&units=imperial" + "&appid="  + apiKey;
      fetch(currentWeatherURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayToday(data);
        });

    } else {
        alert("Error:" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};

var fiveDay = function (cityLat, cityLon) {
    var forecastDataURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +  cityLat + "&lon=" + cityLon + "&exclude=minutely&exclude=hourly&exclude=alerts" + "&units=imperial" + "&appid=" + apiKey; 
    fetch(forecastDataURL).then(function (response) {
     if (response.ok) {
    response.json().then(function (data) {
        displayForecast(data.daily);
          });
        } else {
            alert("Error:" + response.statusText);
          }
        });
      };

      var callCity = function (city) {
        var CityCallURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
        fetch(CityCallURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var cityName = data.name;
          $("#current-city").text(cityName);
          var cityLat = data.coord.lat;
          var cityLon = data.coord.lon;
          cityCurrent(cityLat, cityLon);
          fiveDay(cityLat, cityLon);
        });
    } else if (!response.ok) {
        alert("Error:" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};

var displayToday = function (data) {
    $("#city-temp").text(data.current.temp + " °F");
    $("#city-wind").text(data.current.wind_speed + " MPH");
    $("#city-humid").text(data.current.humidity + "%");

    var WeatherIcon = data.current.weather[0].icon;
    var WeastherIconUrl = "http://openweathermap.org/img/w/" + WeatherIcon + ".png";
    $("#wicon").attr("src", WeastherIconUrl);
    
var UVIndex = data.current.uvi;
    var indexEl = $("#city-uv");
    $("#city-uv").text(UVIndex);
    if (UVIndex <= 2) {
        indexEl.addClass("bg-low");
      } 
      else if (UVIndex <= 5 && UVIndex <= 2) {
        indexEl.addClass("bg-medium");
      } 
      else if (UVIndex <= 7 && UVIndex <= 7) {
        indexEl.addClass("bg-high");
      } 
      else if (UVIndex <= 10 && UVIndex <= 7) {
        indexEl.addClass("bg-veryhigh");
      } 
      else if (UVIndex > 11 && UVIndex > 10) {
        indexEl.addClass("bg-extreme");
      }
    };

    var displayForecast = function (data) {
        for (var i = 0; i < 5; i++) {
      
          
      $("#DatedayOne").text(moment().add(1, "days").format("MM/DD/YYYY"));

      $("#DatedayTwo").text(moment().add(2, "days").format("MM/DD/YYYY"));

      $("#DatedayThree").text(moment().add(3, "days").format("MM/DD/YYYY"));

      $("#DatedayFour").text(moment().add(4, "days").format("MM/DD/YYYY"));

      $("#DatedayFive").text(moment().add(5, "days").format("MM/DD/YYYY"));

          $("#IcondayOne").attr(
            "src",
            "http://openweathermap.org/img/w/" + 
            data[0].weather[0].icon + 
            ".png"
          );
          $("#IcondayTwo").attr(
            "src",
            "http://openweathermap.org/img/w/" + 
            data[1].weather[0].icon + 
            ".png"
          );
          $("#IcondayThree").attr(
            "src",
            "http://openweathermap.org/img/w/" +
             data[2].weather[0].icon +
             ".png"
          );
          $("#IcondayFour").attr(
            "src",
            "http://openweathermap.org/img/w/" +
             data[3].weather[0].icon +
              ".png"
          );
          $("#IcondayFive").attr(
            "src",
            "http://openweathermap.org/img/w/" +
             data[4].weather[0].icon +
              ".png"
          );

          $("#WinddayOne").text(data[0].wind_speed + " MPH");
          $("#WinddayTwo").text(data[1].wind_speed + " MPH");
          $("#WinddayThree").text(data[2].wind_speed + " MPH");
          $("#WinddayFour").text(data[3].wind_speed + " MPH");
          $("#WinddayFive").text(data[4].wind_speed + " MPH");

          $("#HumdayOne").text(data[0].humidity + "%");
          $("#HumdayTwo").text(data[1].humidity + "%");
          $("#HumdayThree").text(data[2].humidity + "%");
          $("#HumdayFour").text(data[3].humidity + "%");
          $("#HumdayFive").text(data[4].humidity + "%");

          var minTemp = data[i].temp.min;
          var maxTemp = data[i].temp.max;
          var windSpeed = data[i].wind_speed;
          var humidity = data[i].humidity;
        }
      };
      $("#submit").on("click", function (event) {
      
        event.preventDefault();

        var enteredCity = cityInput.value.trim();
        if (enteredCity) {
          callCity(enteredCity);
        } else {
          alert("Please enter a valid city");
        }
        cityInput.value = "";
      });