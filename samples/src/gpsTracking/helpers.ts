import L, { LatLngExpression } from 'leaflet';
import GeometryUtil from 'leaflet-geometryutil';

let map: L.Map;
let markers: { [sourceId: string]: L.Marker } = {};

export interface IRouteDetails {
  start: string;
  end: string;
  percentage: number;
}

export function initializeMap(defaultPosition: LatLngExpression) {
  map = L.map('map').setView(defaultPosition, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}

export function updateMarkerPosition(sourceId: string, newPosition: LatLngExpression, routeDetails: IRouteDetails, follow: boolean) {
  let popupContent = `
  <div>
    <p><strong>Route Start:</strong> ${routeDetails.start}</p>
    <p><strong>Route End:</strong> ${routeDetails.end}</p>
    <p><strong>Completion:</strong> ${routeDetails.percentage.toFixed(2)}%</p>
  </div>
`;

  if (markers[sourceId]) {
    markers[sourceId].setLatLng(newPosition).bindPopup(popupContent);
  } else {
    markers[sourceId] = L.marker(newPosition)
      .addTo(map)
      .bindPopup(popupContent);
  }

  if (follow) {
    map.setView(newPosition);
  }
}

export function calculateLength(coordinates: number[][]) {
  const polyline = L.polyline(coordinates as LatLngExpression[]);
  return GeometryUtil.length(polyline);
}

export async function addIframe(clusterId: string, userId: string) {
  const iframe = document.createElement('iframe');
  iframe.id = `iframe-component-${userId}`;
  const user = userId;
  let hostname = window.location.hostname;
  const protocol = window.location.protocol;
  if (hostname === 'localhost') {
    hostname += ':8100';
  }
  const iframeHostname = `${userId}.${hostname}`;
  iframe.src = `${protocol}//${iframeHostname}/gpsTracking/route?cluster=${clusterId}&user=${user}`;
  iframe.style.display = 'none';

  document.body.appendChild(iframe);
  await new Promise((resolve) => {
    setTimeout(resolve, 1);
  });
}
