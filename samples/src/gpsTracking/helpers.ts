import L, { LatLngExpression } from 'leaflet';
import GeometryUtil from 'leaflet-geometryutil';

let map: L.Map;
let markers: { [sourceId: string]: L.Marker } = {};
const SPEED_KMH = 25;

export interface IRouteDetails {
  length: number;
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

export function displayRouteDetails(routeDetails: IRouteDetails, routeId: string, type: string) {
  const detailsElement = document.getElementById('routeDetails');
  if (!detailsElement) return;

  let routeContainer = document.getElementById(`route-${routeId}`);
  if (!routeContainer) {
    routeContainer = document.createElement('div');
    routeContainer.id = `route-${routeId}`;
    routeContainer.classList.add('route-container');
    detailsElement.appendChild(routeContainer);

    if (type === 'commercial') {
      const header = document.createElement('h3');
      header.textContent = `Route ID: ${routeId}`;
      routeContainer.appendChild(header);
    }
  } else {
    if (type === 'commercial') {
      routeContainer.innerHTML = `<h3>Route ID: ${routeId}</h3>`;
    } else {
      routeContainer.innerHTML = '';
    }
  }

  if (type === 'commercial') {
    const startElement = document.createElement('p');
    startElement.textContent = `From: ${routeDetails.start}`;
    routeContainer.appendChild(startElement);

    const endElement = document.createElement('p');
    endElement.textContent = `To: ${routeDetails.end}`;
    routeContainer.appendChild(endElement);
  } else {
    const endElement = document.createElement('p');
    endElement.innerHTML = `Arriving at:<br> ${routeDetails.end}`;
    routeContainer.appendChild(endElement);
  }

  const totalTime = routeDetails.length / (SPEED_KMH / 3.6);
  const remainingTime = totalTime * ((100 - routeDetails.percentage) / 100);
  const timeString = formatTime(remainingTime);

  const estimatedTimeElement = document.createElement('p');
  if (type === 'commercial') {
    estimatedTimeElement.textContent = `Remaining time: ${timeString}`;
  } else {
    estimatedTimeElement.innerHTML = `Remaining time:<br> ${timeString}`;
  }
  routeContainer.appendChild(estimatedTimeElement);
}

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
}
