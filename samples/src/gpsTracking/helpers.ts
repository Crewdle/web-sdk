import L, { LatLngExpression } from 'leaflet';

let map: L.Map;
let marker: L.Marker;

export function initializeMap(defaultPosition: LatLngExpression) {
  map = L.map('map').setView(defaultPosition, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  marker = L.marker(defaultPosition).addTo(map);
}

export function updateMarkerPosition(newPosition: LatLngExpression) {
  if (!map || !marker) {
    console.error("Map or marker not initialized.");
    return;
  }

  marker.setLatLng(newPosition);
  map.panTo(newPosition, { animate: true, duration: 0.5 });
}
