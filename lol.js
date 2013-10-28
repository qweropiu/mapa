function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(40.7143528, -74.0059731),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

  var fromInput = /** @type {HTMLInputElement} */(document.getElementById('fromField'));
  var toInput = /** @type {HTMLInputElement} */(document.getElementById('toField'));
  var inputs = [fromInput, toInput];

  for (i = 0; i < 2; i++) {
    var input = inputs[i];

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    marker = new google.maps.Marker({map: map});

    google.maps.event.addListener(autocomplete, 'place_changed', (function(marker, autocomplete) {
      return function() {
        marker.setVisible(false);
        input.className = '';
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          // Inform the user that the place was not found and return.
          input.className = 'notfound';
          return;
        }

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
    })(marker, autocomplete));
  }
}
google.maps.event.addDomListener(window, 'load', initialize);

