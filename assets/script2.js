var searchFormCityEl = document.querySelector(".search-form-city")
var searchFormStateEl = document.querySelector("#state")
var searchInputCityVal = document.querySelector(".search-input").val;
//var searchInputStateVal = document.querySelector(".format-input").value;
var resultTextEl = document.querySelector(".text")
var btn = $('.btn')
var lat
var long
var weatherCondition
//
//var heading =document.querySelector(".class")




$("#search-btn").on("click", function () {
  event.preventDefault();
  var searchCity = $(".search-input").val();
  var searchState = $(".form-control").children("option:selected").val();
  var apiQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchCity + "," + searchState + ",+1&limit=1&appid=6cdac48da9c3705ea4ff93e00c557ffc"
  var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=6cdac48da9c3705ea4ff93e00c557ffc"
 
 
 

  console.log(searchCity + ' ' + searchState)
  searchApi();
  function searchApi(searchCity, searchState) {
    fetch(apiQueryURL , {method:'get'})
      .then(response => response.json()) 
      .then(data =>{
        //why must I change data to location
        data.forEach(location =>{
        lat =location.lat.toFixed(2);
        long =location.lon.toFixed(2);
        console.log(lat +""+long)
        $(".search").append ("<button class=button>")
        var buttonTest = document.querySelector(".button")
        buttonTest.textContent= location.name
        return fetch(weatherQueryURL)})
      })
      .then (response => response.json());
      console.log(response)
      .then(data=>{

      })
      
      }})
      
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=6cdac48da9c3705ea4ff93e00c557ffc"
        .then(fetch(weatherQueryURL)
        .then(function searchWeather (lat, long) {
          
          (res => {
             if (!res.ok) {
               throw res.json();
             }
             return res.json();
           })
           .then(data => {
             console.log(data);
             weatherCondition = data.weather[0].main;
            console.log(weatherCondition)})
            $('.forecast').append ("<h3 class=location>")
            var locHeading =document.querySelector(".location")
            locHeading.textContent=data.weather[0].main


          }
        
        ))
    
      
        /*$("#weather-btn").on("click", function () {
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
            console.log(weatherCondition)})


          }
         })
      
      }
        )
  
        

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