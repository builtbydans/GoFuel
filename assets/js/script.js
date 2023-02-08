// DOM variables
var fuelCard = $('#fuelCard');
var zipCodeInput = $('#zip-code-input');
var submitZipCode = $('#submit-zip-code');

// Fuel price variables and price calculator
var regular = 3;
var diesel = 4;
var randomCentsOne =  Math.floor(Math.random() * (999 - 001 + 1) + 001);
var randomCentsTwo =  Math.floor(Math.random() * (999 - 001 + 1) + 001);

// Function that randomises price when called in loop
function randomisePrice(price) {
  return Math.floor(Math.random() * price + 1);
}

// Function that generates a random price for Regular
function generateRegularPrice() {
  return `${regular}.${randomisePrice(randomCentsOne)}`;
};

// Function that generates a random price for Diesel
function generateDieselPrice() {
  return `$${diesel}.${randomisePrice(randomCentsTwo)}`;
};

// API call to NREL for Fuel Station Data
submitZipCode.click(function() {
  var userPostalCode = zipCodeInput.val();
  var NERL_URL = `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?location=${userPostalCode}&limit=5&api_key=${NERL_KEY}`;

  $.ajax({
    url: NERL_URL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (var i = 0; i < response.fuel_stations.length; i++) {
      var stationName = response.fuel_stations[i].station_name;
      var stationAdd = response.fuel_stations[i].street_address;
      var stationZip = response.fuel_stations[i].zip;

      var fuelCardBody = $(`
                          <div class="fuelCard">
                            <p>${stationName}</p>
                            <p>${stationAdd}, ${stationZip}</p>
                            <p>Regular: $${generateRegularPrice()} - Diesel: ${generateDieselPrice()}</p>
                          </div>
                        `);

      fuelCard.append(fuelCardBody);
    };
  });
});

// Mapbox Integration
mapboxgl.accessToken = MAPBOX_KEY;

var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-104.95121, 39.66758], // starting position [lng, lat]
  zoom: 10, // starting zoom
});

map.on('load', function () {
  map.resize();
});

//Function to store input data in local storage
var input = document.getElementById('saveServer').value;
localStorage.setItem('server', input);
document.getElementById('saveServer').value = localStorage.getItem('server');

// // API call to get USA Gas prices
// var data = null;

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = false;

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === this.DONE) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("GET", "https://api.collectapi.com/gasPrice/stateUsaPrice?state=WA");
// xhr.setRequestHeader("content-type", "application/json");
// xhr.setRequestHeader("authorization", "apikey 7MWEgB0tzpb27NRZrCuH4X:2Rbnr0TJ15XIVbS9igb95Y");

// xhr.send(data);
