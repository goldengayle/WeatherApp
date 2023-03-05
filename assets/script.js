var searchFormCityEl = document.querySelector(".search-form-city")
var searchFormStateEl = document.querySelector("#state")
var searchInputCityVal = document.querySelector(".search-input").val;
//var searchInputStateVal = document.querySelector(".format-input").value;
var resultTextEl = document.querySelector(".text")
var btn = $('.btn')
var lat
var long
var weatherCondition
var date = " " + dayjs().format('dddd, MMMM D YYYY ')
var locationNamesa

//
//var heading =document.querySelector(".class")
// On load, page has buttons to access past searches
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
$(document).ready(function() {
  $(".search").append("<ul class=pastSearch>");
  var locationNamesa = [];
  for (i = 0; i < searchHistory.length; i++) {
  locationNamesa.push(searchHistory[i].Location)
  $(".pastSearch").prepend("<li class=pastItem>")
  var listItem = document.querySelector(".pastItem")
  var locName = searchHistory[i].Location;
  console.log(locName)
  listItem.textContent =locName;
  }

    
    //for (i = 0; i < locationNamesa.length; i++){
     
      
      
       }
      //listItem.each (function(){
        //var hours = $(this).attr('id');
        //var taskItem = localStorage.getItem(hours);
        //$(this).children("textarea").val(taskItem);
      //var listItem = document.querySelector(".pastItem");
      //listItem.textContent = locationNamesa[i];
  
    //}
  //}
  
)

//On click - Api calls to get latitude/longitude, data is stored and used to call for current and forecast weather
$("#search-btn").on("click", function () {
  event.preventDefault();
  var searchCity = $(".search-input").val();
  var searchState = $(".form-control").children("option:selected").val();
  var apiQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchCity + "," + searchState + ",+1&limit=1&appid=6cdac48da9c3705ea4ff93e00c557ffc"




  console.log(searchCity + ' ' + searchState)
  searchApi();
  function searchApi(searchCity, searchState) {
    fetch(apiQueryURL)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        return res.json();
      })

      .then(data => {
        console.log(data);
        data.forEach(location => {
          lat = location.lat.toFixed(2);
          long = location.lon.toFixed(2);
          $(".search").append("<button class=button>")
          var buttonTest = document.querySelector(".button")
          buttonTest.textContent = location.name
          var locationNamesb = [];
          for (i = 0; i < searchHistory.length; i++) {
          locationNamesb.push(searchHistory[i].Location)
          }
          if (locationNamesb.indexOf(location.name) === -1) {
            searchHistory.push({ Location: location.name, Latitude: lat, Longitude: long })
          };
          localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
          var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=6cdac48da9c3705ea4ff93e00c557ffc"
          fetch(weatherQueryURL)
          // Data is manipulated on the page after being fetched
            .then(res => {
              if (!res.ok) {
                throw res.json();
              }
              return res.json();
            })
            .then(data => {
              console.log(data)
              $('.forecast').append("<h3 class=location>");
              var locHeading = document.querySelector(".location");
              locHeading.textContent = data.name + date;
              $('.forecast').append("<h4 class=mainWeather>");
              var locHeading = document.querySelector(".mainWeather");
              locHeading.textContent = data.weather[0].main;
              $('.forecast').append("<img class=icon>");
              var locHeading = document.querySelector(".icon");
              var iconcode = data.weather[0].icon
              var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"
              $('.icon').attr('src', iconurl)
              var currentTemp = $('<h5>')
              currentTemp.text("Temperature: " + ((data.main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "\u{00B0}F")
              $('.forecast').append(currentTemp)
              var wind = $('<h5>')
              wind.text("Wind Speed: " + (data.wind.speed * 2.237).toFixed(2) + "mph")
              $('.forecast').append(wind)
              var humidity = $('<h5>')
              humidity.text("Humidity: " + data.main.humidity + "%")
              $('.forecast').append(humidity)
            })
        })
      })
  }
})










     //Code source for image: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
     //Code source for state list: https://gist.github.com/RichLogan/9903043

