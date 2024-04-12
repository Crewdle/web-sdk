import L, { LatLngExpression } from 'leaflet';
import GeometryUtil from 'leaflet-geometryutil';

let map: L.Map;
let markers: { [sourceId: string]: L.Marker } = {};
const SPEED_KMH = 25;
const carIcon = L.icon({
  iconUrl: 'car.png',
  iconSize: [19, 27],
  iconAnchor: [9.5, 13.5],
  popupAnchor: [-1.5, -38]
});

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

export function updateMarkerPosition(sourceId: string, newPosition: LatLngExpression, oldPosition: number[], routeDetails: IRouteDetails, follow: boolean) {
  const bearing = calculateBearing(oldPosition, newPosition as number[]);

  const rotatedCarIcon = L.divIcon({
    html: `<img src="car.png" style="transform: rotate(${bearing}deg); width: 19px; height: 27px;">`,
    iconSize: [19, 27],
    iconAnchor: [9.5, 13.5],
    className: 'custom-icon'
  });

  let popupContent = `
    <div>
      <p><strong>Route Start:</strong> ${routeDetails.start}</p>
      <p><strong>Route End:</strong> ${routeDetails.end}</p>
      <p><strong>Completion:</strong> ${routeDetails.percentage.toFixed(2)}%</p>
    </div>
  `;

  if (markers[sourceId]) {
    markers[sourceId].setLatLng(newPosition).setIcon(rotatedCarIcon).bindPopup(popupContent);
  } else {
    markers[sourceId] = L.marker(newPosition, { icon: rotatedCarIcon })
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

export async function addIframe(clusterId: string, userId: string, mapType: string) {
  const iframe = document.createElement('iframe');
  iframe.id = `iframe-component-${userId}`;
  const user = userId;
  let hostname = window.location.hostname;
  const protocol = window.location.protocol;
  if (hostname === 'localhost') {
    hostname += ':8100';
  }
  const iframeHostname = `${hostname}`;
  iframe.src = `${protocol}//${iframeHostname}/gpsTracking/route?cluster=${clusterId}&user=${user}&mapType=${mapType}`;
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
  } else {
    routeContainer.innerHTML = '';
  }

  const infoElements = [
    { label: 'Route ID:', value: type === 'commercial' ? routeId : 'N/A' },
    { label: 'From:', value: type === 'commercial' ? routeDetails.start : 'N/A' },
    { label: 'Arriving at:', value: routeDetails.end },
  ];

  infoElements.forEach((item) => {
    const element = document.createElement('div');
    if (item.value !== 'N/A') {
      element.innerHTML = `<h4 style="display: inline;">${item.label}</h4> <span>${item.value}</span>`;
      routeContainer!.appendChild(element);
    }
  });

  const remainingTime = routeDetails.length / (SPEED_KMH / 3.6);
  const timeString = formatTime(remainingTime - (remainingTime * (routeDetails.percentage / 100)));

  const estimatedTimeElement = document.createElement('div');
  estimatedTimeElement.innerHTML = `<h4 style="display: inline;">Remaining time:</h4> <span>${timeString}</span>`;
  routeContainer.appendChild(estimatedTimeElement);
}

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
}

function calculateBearing(startCoords: number[], destCoords: number[]) {
  const [startLat, startLng] = startCoords;
  const [destLat, destLng] = destCoords;
  const startLatRad = startLat * Math.PI / 180;
  const startLngRad = startLng * Math.PI / 180;
  const destLatRad = destLat * Math.PI / 180;
  const destLngRad = destLng * Math.PI / 180;

  const y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad);
  const x = Math.cos(startLatRad) * Math.sin(destLatRad) -
            Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(destLngRad - startLngRad);
  const bearing = Math.atan2(y, x) * 180 / Math.PI;

  return (bearing + 360) % 360;
}
