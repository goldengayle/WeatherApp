var searchFormCityEl = document.querySelector(".search-form-city")
var searchFormStateEl = document.querySelector("#state")
var searchInputCityVal = document.querySelector(".search-input").val;
//var searchInputStateVal = document.querySelector(".format-input").value;
var resultTextEl = document.querySelector(".text")
var btn = $('.btn')
var lat
var long
var weatherCondition
var searchhistory =[]
//
//var heading =document.querySelector(".class")




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
          //console.log(lat + " " + long)
          localStorage.setItem("latitude",lat);
          localStorage.setItem("longitude", long)
          $(".search").append ("<button class=button>")
          var buttonTest = document.querySelector(".button")
          buttonTest.textContent= location.name
          localStorage.getItem(searchhistory)
        
        })
          })
        }})
      
        $("#weather-btn").on("click", function () {
          event.preventDefault();
          var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=6cdac48da9c3705ea4ff93e00c557ffc"
          searchWeather();
          function searchWeather (lat, long) {
           fetch(weatherQueryURL)
           .then(res => {
             if (!res.ok) {
               throw res.json();
             }
             return res.json();
           })
           .then(data => {
             console.log(data);
             weatherCondition = data.weather[0].main;
            console.log(weatherCondition)
            $('.forecast').append ("<h3 class=location>");
            var locHeading =document.querySelector(".location");
            locHeading.textContent=data.name;
            $('.forecast').append ("<h4 class=mainWeather>");
            var locHeading =document.querySelector(".mainWeather");
            locHeading.textContent = data.weather[0].main;
            $('.forecast').append ("<img class=icon>");
            var locHeading =document.querySelector(".icon");
            var iconcode = data.weather[0].icon
            var iconurl ="http://openweathermap.org/img/w/"+ iconcode +".png"
            $('.icon').attr('src',iconurl)
            var currentTemp = $('<h5>')
            currentTemp.text("Temperature: " +((data.main.temp - 273.15)*(9/5)+32).toFixed(2) + "\u{00B0}F")
            $('.forecast').append(currentTemp)
            var wind=$('<h5>')
            wind.text("Wind Speed: "+ (data.wind.speed* 2.237).toFixed(2) +"mph")
            $('.forecast').append(wind)
            var humidity=$('<h5>')
            humidity.text("Humidity: "+ data.main.humidity +"%")
            $('.forecast').append(humidity)

           
           })



          }
         })
      
   
        

     /*.then(data => {
              fetch(weatherQueryURL)
                .then(res => {
                  if (!res.ok) {
                    throw res.json();
                  }
                  return res.json();
                })
                .then(data => {
                  console.log(data);
                })
            })*/
      

