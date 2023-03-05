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
var getHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var searchHistory=getHistory.reverse();

var topTen =searchHistory.splice(0, 8);
searchHistory =topTen.reverse();

$(document).ready(function() {
  $(".search").append("<ul class=pastSearch>");
  var locationNamesa = [];
  for (i = 0;  i < searchHistory.length; i++) {
  locationNamesa.push(searchHistory[i].Location)
  $(".pastSearch").prepend("<li class=pastItem>")
  var listItem = document.querySelector(".pastItem")
  var locName = searchHistory[i].Location;
  console.log(locName)
  listItem.textContent =locName;
  var locNameRefine= locName.replace(/ /g,"%20");
  console.log(locNameRefine)
  listItem.classList.add(locNameRefine);
  }

  var locations = $('.pastItem')
  for (i=0; i <locations.length; i++){
    locations[i].addEventListener('click', function(){
      $('.forecast').html("")
     
      $(this).removeClass("pastItem");
      var classLoc = $(this).attr("class");
      var classLocRefine =classLoc.replace(/%20/g," ")
      console.log(classLocRefine)
      var index = locationNamesa.indexOf(classLocRefine)
      var pastObject = searchHistory[index];
      lat = pastObject.Latitude
      long = pastObject.Longitude
      console.log(lat +''+long)
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
              locHeading.textContent = data.name;
              $('.forecast').append("<h5 class=date>");
              var locHeading = document.querySelector(".date");
              locHeading.textContent = date;
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
      
      console.log(pastObject)
    })
  }



  //for (i=0 ; i < saveButton.length; i++) {
  //  saveButton[i].addEventListener('click', function(){
  
   //var info= $(this).siblings("textarea").val();
   //var hour= $(this).parent().attr('id');
    //console.log(info)
    //localStorage.setItem(hour, info);
  //})}
  
  //hourBlocks.each (function () {
    //var numID = $(this).attr('id');
    //var pnum = parseInt(numID)
   // console.log(pnum)
   // if(pnum > nowHour ){
    //  $(this).addClass('future');
    //} else if 
    //  (pnum === nowHour){
    //    $(this).addClass('present');
    //  } else{
    //    $(this).addClass('past');
    //  }
  //  }
  //onsole.log(locations)

    
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
  var presearchCity = $(".search-input").val();
  var searchCity =presearchCity.trim().replace(/ /g, "%20")
  console.log(searchCity)

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
        $('.forecast').html("")
        data.forEach(location => {
          lat = location.lat.toFixed(2);
          long = location.lon.toFixed(2);
          $(".pastSearch").prepend("<li class=pastItem>")
          var listItem = document.querySelector(".pastItem")
          var locNameb = location.name;
          listItem.textContent =locNameb;
          var locNamebRefine =locNameb.replace(/ /g,"%20")
          listItem.classList.add(locNamebRefine);
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
              
              $('.forecast').append("<h3 class=location>");
              var locHeading = document.querySelector(".location");
              locHeading.textContent = data.name;
              $('.forecast').append("<h5 class=date>");
              var locHeading = document.querySelector(".date");
              locHeading.textContent = date;
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
            var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?lat=" +lat +"&lon="+long +"&appid=6cdac48da9c3705ea4ff93e00c557ffc"
            fetch(forecastURL)
            .then(res => {
              if (!res.ok) {
                throw res.json();
              }
              return res.json();
            })
            .then(data =>{
              console.log(data);
              var foreCastFive = data.list;
              var foreCastRefine =foreCastFive.splice(0,5)
              console.log(foreCastRefine)
              foreCastRefine.forEach(dayFore =>{
                
              $('.forecast').append("<h5 class=date>");
              var locHeading = document.querySelector(".date");
              locHeading.textContent = date;
              $('.forecast').append("<h4 class=mainWeather>");
              var locHeading = document.querySelector(".mainWeather");
              locHeading.textContent = dayFore.weather[0].main;
              $('.forecast').append("<img class=icon>");
              var locHeading = document.querySelector(".icon");
              var iconcode = dayFore.weather[0].icon
              var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"
              $('.icon').attr('src', iconurl)
              var currentTemp = $('<h5>')
              currentTemp.text("Temperature: " + ((dayFore.main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "\u{00B0}F")
              $('.forecast').append(currentTemp)
              var wind = $('<h5>')
              wind.text("Wind Speed: " + (dayFore.wind.speed * 2.237).toFixed(2) + "mph")
              $('.forecast').append(wind)
              var humidity = $('<h5>')
              humidity.text("Humidity: " + dayFore.main.humidity + "%")
              $('.forecast').append(humidity)

              })
              

              })

              
            })

        })
      }})
  










     //Code source for image: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
     //Code source for state list: https://gist.github.com/RichLogan/9903043

