import { SDK } from '@crewdle/web-sdk';
import { vendorId, accessToken } from '../credentials';
import { route1, route2, route3, route4 } from './routes';
import { calculateLength, IRouteDetails } from './helpers';
import { map } from 'leaflet';

interface ITrackingMessage {
  coordinate: number[];
  oldPosition: number[];
  routeDetails: IRouteDetails;
}

let userIdFrame: string;
let currentIndex = 0;
let usedRoute: {
  coordinates: number[][];
  start: string;
  end: string;
  length: number;
};
let lastPosition: number[];
let currentLength = 0;
let mapDetails: IRouteDetails;
let fullLength = 0;

export async function start(clusterId: string, userId: string, mapType: string) {
  userIdFrame = userId;

  if (userIdFrame === 'route1') {
    usedRoute = route1;
  } else if (userIdFrame === 'route2') {
    usedRoute = route2;
  } else if (userIdFrame === 'route3') {
    usedRoute = route3;
  }

  if (mapType === 'user-map') {
    mapDetails = {
      length: usedRoute.length + route4.length,
      start: usedRoute.start,
      end: route4.end,
      percentage: 0,
    };
  }

  const sdk = await SDK.getInstance(vendorId, accessToken, {
    minConnections: 3,
  });

  await sdk.authenticateUser({
    id: userIdFrame,
    displayName: userIdFrame,
    email: `${userIdFrame}@crewdle.com`,
  });

  const cluster = await sdk.joinCluster(clusterId)
  const pubsub = cluster.openPubSubTopic<ITrackingMessage>('tracking');

  let usedCoordinates = usedRoute.coordinates;

  if (mapType === 'user-map') {
    fullLength = usedRoute.length + route4.length;
  } else {
    fullLength = usedRoute.length;
  }
  lastPosition = usedCoordinates[0];

  const workerScript = `
    self.onmessage = function(e) {
      if (e.data === 'start') {
        setInterval(() => {
          self.postMessage('tick');
        }, 50);
      }
    };
  `;
  const blob = new Blob([workerScript], { type: 'application/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));

  worker.onmessage = function(e) {
    if (mapType === 'user-map') {
      usedRoute.length = mapDetails.length;
      usedRoute.start = mapDetails.start;
      usedRoute.end = mapDetails.end;
    }
    let percentage = 0;
    if (currentIndex >= usedCoordinates.length) {
      if (mapType === "user-map" && usedRoute !== route4) {
        currentIndex = 0;
        usedRoute = route4;
        usedCoordinates = usedRoute.coordinates;
        lastPosition = usedRoute.coordinates[0];
        worker.postMessage("start");
      } else {
        worker.terminate();
        pubsub.publish({ coordinate: usedCoordinates[usedCoordinates.length - 1], oldPosition: lastPosition, routeDetails: {
            length: usedRoute.length,
            start: usedRoute.start,
            end: usedRoute.end,
            percentage: 100,
          }});
        return;
      }
    }

    const data = usedCoordinates[currentIndex];
    currentLength += calculateLength([lastPosition, data]);
    percentage = Math.abs(currentLength / fullLength) * 100;

    pubsub.publish({ coordinate: data, oldPosition: lastPosition, routeDetails: {
      length: usedRoute.length,
      start: usedRoute.start,
      end: usedRoute.end,
      percentage: percentage,
    }});

    lastPosition = data;
    currentIndex += 1;
  };
  worker.postMessage('start');
}
