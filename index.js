let map;
const center = {
  lat: 49.99274133312724, lng: 36.22676694696251
}

const defaultBounds = {
  north: center.lat + 0.1,
  south: center.lat - 0.1,
  east: center.lng + 0.1,
  west: center.lng - 0.1,
};

const autocompleteOptions = {
  bounds: defaultBounds,
  componentRestrictions: { country: "ua" },
  fields: ["address_components"],
  origin: center,
  strictBounds: false,
};

async function initMap(params) {
    let mapProp= {
        center: new google.maps.LatLng(center.lat, center.lng),
        zoom: 12,
      };
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
