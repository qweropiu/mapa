var dirDisp;
var directionsService = new google.maps.DirectionsService();
var inputs = [], markers = [], autocompletes = [];

function initialize() {
  var fromInput = $("#fromField")[0];
  var toInput = $("#toField")[0];
  inputs = [fromInput, toInput];

  var mapOptions = {
    center: new google.maps.LatLng(40.7143528, -74.0059731),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map($("#map-canvas")[0], mapOptions);
  dirDisp = new google.maps.DirectionsRenderer();
  dirDisp.setMap(map);

  for (i = 0; i < 2; i++) {
    autocompletes[i] = new google.maps.places.Autocomplete(inputs[i]);
    autocompletes[i].bindTo('bounds', map);

    markers[i] = new google.maps.Marker({map: map});

    google.maps.event.addListener(autocompletes[i], 'place_changed', (function(i) {
      return function() {
        var marker = markers[i],
            autocomplete = autocompletes[i],
            input = inputs[i];
        var place = autocomplete.getPlace();

        input.className = '';
        if (!place.geometry) {
          input.className = 'notfound';
          return;
        }

        marker.setVisible(false);
        marker.setIcon(/** @type {google.maps.Icon} */({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
      }
    })(i));
  }
}

function calcRoute() {
  var request = {
      origin: $("#fromField").val(),
      destination: $("#toField").val(),
      travelMode: google.maps.DirectionsTravelMode.TRANSIT
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var timeSeconds = 0;
      var legs = response["routes"][0]["legs"];

      dirDisp.setDirections(response);

      for (var i = 0, len = legs.length; i < len; i++) {
        timeSeconds += legs[i]["duration"]["value"];
      }
      $("#duration").html("this trip takes " + hms(timeSeconds));
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

