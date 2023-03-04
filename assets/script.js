var searchFormCityEl = document.querySelector(".search-form-city")
var searchFormStateEl = document.querySelector("#state")
var searchInputCityVal = document.querySelector(".search-input").val;
//var searchInputStateVal = document.querySelector(".format-input").value;
var resultTextEl = document.querySelector(".text")
var btn = $('.btn')
var lat
var long
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
          console.log(lat + " " + long)
          resultTextEl.textContent=lat + " " + long;
          localStorage.setItem("latitude",lat);
          localStorage.setItem("longitude", long)
          // I want to put the value of searchCity as text on my page? Instead of reading the value, it says searchCity
          $('#search-btn').text(function(){
            return $(this).searchCity;
          })
          //$(".main").append(tryBy);
          //$('#search-btn').prop("value", searchCity.text())
        
        })
          })
        }
      
        $("#weather-btn").on("click", function () {
          event.preventDefault();
          //lat =localStorage.getItem(lat);
          //long= localStorage.getItem(long);
          console.log(lat +''+ long + "hello")

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
             console.log(data);})


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
      

