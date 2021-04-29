var bodyContainer = document.querySelector("#body-container");
var body = document.querySelector("body");
var mapDiv = document.createElement("div");
    mapDiv.id = "map";
// displays current date
$(document).ready(function () {

    $("#current-date").append("<strong>Today's Date:</strong>  " + (moment().format('dddd, MMMM Do')));

    // fixes the enter button error where it reloads page
    $(function () {
        $("form").submit(function () {
            return false;
        });
    });

});
// gets user's location
$("#locationBtn").on("click", function (event) {
    event.preventDefault();
    // hides the map and review row until search button is clicked
    if (event) {
        $('#map-container').css("display", "initial");
        $('#reviews-container').css("display", "initial");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        geoLat = position.coords.latitude;
        geoLon = position.coords.longitude;
        console.log(geoLat, geoLon);

        // loads user's location in google map
        $("#reviews").empty();
        // var mapButton = document.querySelector("#map-nav-item");
        // mapButton.addEventListener("click", initialize());
        //initialize();
        // grabs weather for user's location
        queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + geoLat + "&lon=" + geoLon + "&appid=8f775258afdec054195f89c38855f678&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            const geoCity = response.name;
            // console.log(geoCity);
            const country = response.sys.country;
            // console.log(country);
            var currentIcon = $("<img>")
                .attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
            currentIcon.css({
                "position": 'absolute'
            });
            console.log(currentIcon);
            var rTemp0 = Math.floor(response.main.temp);
            // console.log(rTemp0);

            $("#current-city").empty();
            $("#temp").empty();
            $("#current-icon").empty();

            $("#current-city").append("<strong>Current City:  </strong>" + geoCity + ", " + country);
            $("#temp").append("<strong>Current Temp: </strong>" + rTemp0 + "° F");
            $("#current-icon").append(currentIcon);
        });
    })
});

// grabbing user's inputted location
var searchBtn = $("#searchBtn")

searchBtn.on("click", function (event) {
    event.preventDefault();
    $("#reviews").empty();

    // hides the map and review row until search button is clicked
    if (event) {
        $('#map-container').css("display", "initial");
        $('#reviews-container').css("display", "initial");
    }

    var button = $(this);
    console.log("click");

    var city = $("#city-name").val().trim();
    console.log(city);

    // reverse lookup using open weather
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8f775258afdec054195f89c38855f678&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        const geoCity = response.name;
        console.log(geoCity);
        const country = response.sys.country;
        console.log(country);
        var currentIcon = $("<img>")
            .attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        // console.log(currentIcon);
        // This click event is getting a different icon than the ready function
        var rTemp0 = Math.floor(response.main.temp);
        console.log(rTemp0);

        geoLat = response.coord.lat
        console.log(geoLat);
        geoLon = response.coord.lon
        console.log(geoLon);

        initialize()

        $("#temp").empty();
        $("#current-icon").empty();
        $("#current-city").empty();

        $("#current-city").append("<strong>Current City:  </strong>" + geoCity + ", " + country);
        $("#temp").prepend("<strong>Current Temp: </strong>" + rTemp0 + "° F");
        $("#current-icon").prepend(currentIcon);
    });
});
var homePageText = document.createElement("div");
        homePageText.innerHTML = ` <!-- City Search Bar + Header -->
            <div class="row" id="form-container">
                <form class="col s12">
                    <header>
                        <div class="header-wrapper">
                            <h1>Find a Coffee Shop Near You</h1>
                        </div>
                    </header>

                    <div class="row" id="location-row">
                        <div class="col s6" id="inputCol">

                            <!-- User's Input -->
                            <div class="input-field">
                                <input type="text" class="form-control validate" id="city-name" aria-label="Search"
                                    placeholder="Enter City Name">
                                <label for="city-name"></label>
                                <i class="waves-effect waves-light btn searchBtn" id="searchBtn"><span
                                        class="fa fa-search"></span></i>

                                <i class="waves-effect waves-light btn searchBtn" id="locationBtn">Search Near You<span class="fa fa-map-marker"></span></i>
                            </div>

                            <!-- Showing locations INFO -->
                            <div class="row" id="day-info-wrapper">
                                <div class="col s9">
                                    <div class="row" id="current-date"></div>
                                    <div class="row" id="current-city"></div>
                                    <div class="col" id="temp"></div>
                                </div>
                                <div class="col s3">
                                    <div class="row" id="current-icon"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- break line -->
            <hr>

            <!-- Map Display with options -->
            <div class="row" id="map-container">
                <div class="card" style="background-color: #9F956C;">
                    <div class="card-image">
                        <!-- googleMap -->
                    </div>
                    <div class="card-content" id="map"></div>
                </div>
            </div>

            <!-- List of options with details with no more than 10 -->
            <div class="row" id="reviews-container">
                <div class="card" style="background-color: #9F956C;">
                    <div class="card-content white-text" id="reviews-title-container">
                        <span class="card-title" id="reviews-title"><strong>Reviews:</strong></span>
                    </div>
                    <div class="card-action">
                        <div id="reviews"></div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer class="page-footer" id="footer">
                <div class="footer-copyright">
                    <div class="container" style="text-align:center;">Developed by Marty Miloslavich
                    </div>
                </div>
            </footer>`;
var homeButton = document.querySelector("#home-nav-item");
function displayHomePage() {
  removeAllChildNodes(bodyContainer);
  if(body.contains(mapDiv)) {
    body.removeChild(mapDiv);
  }
  if(body.contains(shopDiv)) {
    body.removeChild(shopDiv);
  }
  activateNavItem(homeButton);
  bodyContainer.appendChild(homePageText);
}
homeButton.addEventListener("click", displayHomePage);
      // window.onload = function() {
      //   displayHomePage();
      // }



var aboutPageText = document.createElement("div");
        aboutPageText.innerHTML = `<div>
        <p style="color: white; "class="fs-5">This application was created by Martin Miloslavich. It allows a user to search for local coffee shops by city or by using their current location. It was built using Google Maps API, HTML5, CSS3, and Javascript. It uses Google Maps API, Google Places API, Open Weather Map API, and Geolocation.  
        </p>
        </div>`;

//Displays the information about the application
var aboutButton = document.querySelector("#about-nav-item");
function displayAboutPage() {
  removeAllChildNodes(bodyContainer);
  if(body.contains(mapDiv)) {
    body.removeChild(mapDiv);
  }
  if(body.contains(shopDiv)) {
    body.removeChild(shopDiv);
  }
  activateNavItem(aboutButton);
  bodyContainer.appendChild(aboutPageText);
}
aboutButton.addEventListener("click", displayAboutPage);


// google maps
var shopsButton = document.querySelector("#shop-nav-item");
var shopDiv = document.createElement("div");
      shopDiv.id = "reviews";
let map;
var infowindow;
var mapButton = document.querySelector("#map-nav-item");
function initialize() {
  removeAllChildNodes(bodyContainer);
  if(body.contains(shopDiv)) {
    body.removeChild(shopDiv);
  }
  activateNavItem(mapButton);
  document.querySelector("body").appendChild(mapDiv);
  
    // The location of user
    var userLoc = {
        lat: geoLat,
        lng: geoLon
    };
    // The map, centered at location
    map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 12,
        center: userLoc
    });

    // The marker, positioned at user's location
    var marker = new google.maps.Marker({
        position: userLoc,
        map: map,
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    })

    // info on marker
    var infoWindow = new google.maps.InfoWindow({
        content: '<p>You Are Here</p>'
    });

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
    var request = {
        location: userLoc,
        radius: 8047,
        types: ['cafe'] //This is what the cafe is searching for
    };
    infowindow = new google.maps.InfoWindow();
    
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    

};



function callback(results, status) {
    // removeAllChildNodes(bodyContainer);
   
    // activateNavItem(shopsButton);
    // document.querySelector("body").appendChild(shopDiv);
    var cafeObjectArray = []
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var cafeObject = {
                latitude: "",
                longitude: "",
                name: "",
                rating: "",
                place: ""
            }
            createMarker(results[i], i);
            console.log(results[i], i);

            cafeObject.latitude = results[i].geometry.location.lat();
            cafeObject.longitude = results[i].geometry.location.lng();
            cafeObject.name = results[i].name;
            cafeObject.rating = results[i].rating;
            cafeObject.place = results[i].place_id;
            cafeObjectArray.push(cafeObject)
        }
        sortCafeObjectArray(cafeObjectArray);
        // shopsButton.addEventListener("click", pushCafeInfoToHTML(cafeObjectArray));
        pushCafeInfoToHTML(cafeObjectArray);
    }
}
mapButton.addEventListener("click", initialize);

function callback2(results, status) {
    removeAllChildNodes(bodyContainer);
   if(body.contains(mapDiv)) {
    body.removeChild(mapDiv);
  }
    activateNavItem(shopsButton);
    document.querySelector("body").appendChild(shopDiv);
    var cafeObjectArray = []
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var cafeObject = {
                latitude: "",
                longitude: "",
                name: "",
                rating: "",
                place: ""
            }
            createMarker(results[i], i);
            console.log(results[i], i);

            cafeObject.latitude = results[i].geometry.location.lat();
            cafeObject.longitude = results[i].geometry.location.lng();
            cafeObject.name = results[i].name;
            cafeObject.rating = results[i].rating;
            cafeObject.place = results[i].place_id;
            cafeObjectArray.push(cafeObject)
        }
        shopsButton.addEventListener("click", pushCafeInfoToHTML(cafeObjectArray));
        //pushCafeInfoToHTML(cafeObjectArray);
    }
}
function initializeShop() {
  removeAllChildNodes(bodyContainer);
  if(body.contains(mapDiv)) {
    body.removeChild(mapDiv);
  }
  activateNavItem(shopsButton);
  document.querySelector("body").appendChild(shopDiv);
  
    // The location of user
    var userLoc = {
        lat: geoLat,
        lng: geoLon
    };
    
    // The marker, positioned at user's location
    var marker = new google.maps.Marker({
        position: userLoc,
        map: map,
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    })

    // info on marker
    var infoWindow = new google.maps.InfoWindow({
        content: '<p>You Are Here</p>'
    });

    var request = {
        location: userLoc,
        radius: 8047,
        types: ['cafe'] //This is what the cafe is searching for
    };
    infowindow = new google.maps.InfoWindow();
    
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback2);
    

};
shopsButton.addEventListener("click", initializeShop);

function pushCafeInfoToHTML(cafeObjectArray) {
    
    var cardAction = $("#reviews");
    for (i = 0; i < cafeObjectArray.length; i++) {
      cardAction.append("<h6><strong>" + cafeObjectArray[i].name + "</strong></h6>");
      cardAction.append("<p id='stars'>" + cafeObjectArray[i].rating + "  " + getStars(cafeObjectArray[i].rating) + "</p>");
      cardAction.append("<p><a target='_blank' href = https://www.google.com/maps/search/?api=1&query=" + cafeObjectArray[i].latitude + "," + cafeObjectArray[i].longitude + ">" + "Directions" + "</a></p>");
      cardAction.append("<p><a target='_blank' href = https://search.google.com/local/reviews?placeid=" + cafeObjectArray[i].place + ">" + "Reviews" + "</a></p>");
      cardAction.append("<hr>");
    }
    //shopsButton.addEventListener("click", cardAction);
}

// document.getElementById("stars").innerHTML = getStars(ratings);
function getStars(ratings) {

    // Round to nearest half
    ratings = Math.round(ratings * 2) / 2;
    let output = [];

    // Append all the filled whole stars
    for (var i = ratings; i >= 1; i--)
        output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    // If there is a half a star, append it
    if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    // Fill the empty stars
    for (let i = (5 - ratings); i >= 1; i--)
        output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    return output.join('');

}

 //deletes all of the child nodes
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
//lists an item as active
function activateNavItem(item) {
  var navs = document.querySelectorAll(".nav-link");
  item.classList.add("active");
  navs.forEach(i => {
    if(i != item) {
      i.classList.remove("active");
    }
  });
}

function createMarker(place, index) {
    var placeLoc = place.geometry.location;
    var latti = place.geometry.location.lat();
    var longi = place.geometry.location.lng();
    console.log(latti, longi);
    console.log(place.name);
    var marker = new google.maps.Marker({
        map: map,
        position: {
            lat: latti,
            lng: longi
        },
        
        title: index + "",
        zIndex: index,
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    })
}
