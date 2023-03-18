var searchFormCityEl = document.querySelector(".search-form-city")
var searchFormStateEl = document.querySelector("#state")
var searchInputCityVal = document.querySelector(".search-input").val;
var resultTextEl = document.querySelector(".text")
var btn = $('.btn')
var lat
var long
var weatherCondition
var date = " " + dayjs().format('dddd, MMMM D YYYY')
var locationNamesa =[]
var searchState 
var listItem


//
// On load, page has buttons to access past searches. This function returns the most recent nine searches.
var getHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var searchHistory = getHistory.reverse();
var topNine = searchHistory.splice(0, 8);
searchHistory = topNine.reverse();


$(document).ready(function () {
 getHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
 searchHistory = getHistory.reverse();
 topNine = searchHistory.splice(0, 8);
searchHistory = topNine.reverse();
  $(".search").append("<ul class=pastSearch>");
  //var locationNamesa = [];
  for (i = 0; i < searchHistory.length; i++) {
    locationNamesa.push(searchHistory[i].Location)
    $(".pastSearch").prepend("<li class=pastItem>")
    var listItem = document.querySelector(".pastItem")
    var locName = searchHistory[i].Location;
    searchState =searchHistory[i].State;
    listItem.textContent = locName + " "+ searchState;
    var locNameRefine = locName.replace(/ /g, "%20");
    listItem.classList.add(locNameRefine);
  }
  var locations = $('.pastItem')
  for (i = 0; i < locations.length; i++) {
    locations[i].addEventListener('click', function () {
      $('.foreCard').html("")
      $('.current').html("")
      $(this).removeClass("pastItem");
      var classLoc = $(this).attr("class");
      $(this).addClass("pastItem");
      var classLocRefine = classLoc.replace(/%20/g, " ")
      var index = locationNamesa.indexOf(classLocRefine)
      var pastObject = searchHistory[index];
      lat = pastObject.Latitude
      long = pastObject.Longitude
      searchState = pastObject.State
     
      
      getForeCast(lat, long);
      getWeather(lat, long);
    })
    }})

    

//This function displays current weather conditions based on latitude and longitude
function getWeather(lat, long) {
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
      
      $('.current').append("<h3 class=location>");
      var locHeading = document.querySelector(".location");
      locHeading.textContent = data.name + " "+searchState;
      $('.current').append("<h5 class=date>");
      var dateHeading = document.querySelector(".date");
      dateHeading.textContent = date;
      $('.current').append("<h4 class=mainWeather>");
      var weatherHeading = document.querySelector(".mainWeather");
      weatherHeading.textContent = data.weather[0].main;
      $('.current').append("<img class=icon>");
      var locHeading = document.querySelector(".icon");
      var iconcode = data.weather[0].icon
      var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png"
      $('.icon').attr('src', iconurl)
      var currentTemp = $('<h5>')
      currentTemp.text("Temperature: " + ((data.main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "\u{00B0}F")
      $('.current').append(currentTemp)
      var wind = $('<h5>')
      wind.text("Wind Speed: " + (data.wind.speed * 2.237).toFixed(2) + "mph")
      $('.current').append(wind)
      var humidity = $('<h5>')
      humidity.text("Humidity: " + data.main.humidity + "%")
      $('.current').append(humidity)
    })

    

}

// Get Forecast retrieves forecast for local weather, the data is found to only display data at noon of each of the next five days. These are displayed in separate cards
function getForeCast() {
  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=6cdac48da9c3705ea4ff93e00c557ffc"
  fetch(forecastURL)
    .then(res => {
      if (!res.ok) {
        throw res.json();
      }
      return res.json();
    })
    .then(data => {
      var foreCastFive = data.list;
      var tomorrowNoon = dayjs().add(1, 'day')
      var lookForTomorrow = dayjs(tomorrowNoon).format('YYYY-MM-DD 12:00:00')
      for (i = 0; i < 9; i++) {
        if (foreCastFive[i].dt_txt === lookForTomorrow) {
          var indexBegin = i
        }
//if 9, then only four dates
      }
    var numberOf = 0
      var interval = 8
      var foreCastRefine = [foreCastFive[indexBegin], foreCastFive[indexBegin + interval], foreCastFive[indexBegin + (2 * interval)], foreCastFive[indexBegin + (3 * interval)], foreCastFive[indexBegin + (4 * interval)]]
    
      foreCastRefine.forEach(dayFore => {
       var weatherDay =$('<div class=weatherDay>');
       weatherDay.addClass("card text-white bg-primary mb-3 col-12 col-sm-6	col-md-4	col-lg-2")
      $('.foreCard').append(weatherDay)
        var dateForeCast = $('<h4>');
        dateForeCast.text(dayjs(dayFore.dt_txt).format('dddd, MMMM D'));
        $("div.weatherDay:last-of-type").append(dateForeCast)
        var mainWeatherFore = $('<h4>');
        mainWeatherFore.text(dayFore.weather[0].main);
        $("div.weatherDay:last-of-type").append(mainWeatherFore);
       var imageIcon = $('<img>') 
        var iconcode = dayFore.weather[0].icon
        var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png"
        $("div.weatherDay:last-of-type").append(imageIcon);
        imageIcon.attr("src",iconurl)
        var currentTemp = $('<h5>')
        currentTemp.text("Temperature: " + ((dayFore.main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "\u{00B0}F")
        $("div.weatherDay:last-of-type").append(currentTemp)
        var wind = $('<h5>')
        wind.text("Wind Speed: " + (dayFore.wind.speed * 2.237).toFixed(2) + "mph")
        $("div.weatherDay:last-of-type").append(wind)
        var humidity = $('<h5>')
        humidity.text("Humidity: " + dayFore.main.humidity + "%")
        $("div.weatherDay:last-of-type").append(humidity)
    })
    })
}

//On click - Api calls to get latitude/longitude, data is stored and used to call for current and forecast weather. Event listener is added to new location so that user can return to it
$("#search-btn").on("click", function () {
  event.preventDefault();
  $('.foreCard').html("")
      $('.current').html("")
  var presearchCity = $(".search-input").val();
  console.log(presearchCity)
  var searchCity = presearchCity.replace(/ /g, "%20")
  console.log(searchCity)
  searchState = $(".form-control").children("option:selected").val();
  if (searchCity === ""){
    alert("please enter a value to get weather")
    return;
  }
  var apiQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchCity + "," + searchState + ",+1&limit=1&appid=6cdac48da9c3705ea4ff93e00c557ffc"
  console.log(apiQueryURL)
  searchApi();
  function searchApi() {
    fetch(apiQueryURL)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        return res.json();
      })

      .then(data => {
        data.forEach(location => {
          lat = location.lat.toFixed(2);
          long = location.lon.toFixed(2);
          $(".pastSearch").prepend("<li class=recentItem>")
          listItem = document.querySelector(".recentItem")
          var locNameb = location.name +" " +searchState;
          var locNamec=location.name
          listItem.textContent = locNameb;
          var locNamebRefine = locNameb.replace(/ /g, "%20")
          var locNamecRefine = locNamec.replace(/ /g, "%20")
          listItem.classList.add(locNamecRefine);
          var locationNamesb = [];
          for (i = 0; i < searchHistory.length; i++) {
            locationNamesb.push(searchHistory[i].Location)
          }
          if (locationNamesb.indexOf(location.name) === -1) {
            searchHistory.push({ Location: location.name, Latitude: lat, Longitude: long, State: searchState })
            locationNamesb.push(locNamec)
          };
          localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
          console.log(searchHistory)
          listItem.addEventListener("click", function () {
            $('.foreCard').html("")
            $('.current').html("")
            $(this).removeClass("recentItem");
            var classLoc = $(this).attr("class");
            var classLocRefine = classLoc.replace(/%20/g, " ")
            var index = locationNamesb.indexOf(classLocRefine)
            var pastObject = searchHistory[index];
            lat = pastObject.Latitude
            long = pastObject.Longitude
            searchState = pastObject.State
            getForeCast();
            getWeather(lat, long);
            $(this).addClass("recentItem");
           });
          getForeCast();
          getWeather(lat, long);

          
          
        })
        

      })
      .catch(function (error) {
         alert("error!");
      });


  }})

 





     

