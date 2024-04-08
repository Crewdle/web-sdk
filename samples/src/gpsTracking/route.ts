import { SDK } from '@crewdle/web-sdk';
import { vendorId, accessToken } from '../credentials';
import { route1, route2, route3 } from './routes';
import { calculateLength, IRouteDetails } from './helpers';

interface ITrackingMessage {
  coordinate: number[];
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

export async function start(clusterId: string, userId: string) {
  userIdFrame = userId;

  if (userIdFrame === 'route1') {
    usedRoute = route1;
  } else if (userIdFrame === 'route2') {
    usedRoute = route2;
  } else if (userIdFrame === 'route3') {
    usedRoute = route3;
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

  const usedCoordinates = usedRoute.coordinates;

  const fullLength = usedRoute.length;
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
    let percentage = 0;
    if (currentIndex >= usedCoordinates.length) {
      worker.terminate();
      pubsub.publish({ coordinate: usedCoordinates[usedCoordinates.length - 1], routeDetails: {
        length: usedRoute.length,
        start: usedRoute.start,
        end: usedRoute.end,
        percentage: 100,
      }});
      return;
    }

    const data = usedCoordinates[currentIndex];
    currentLength += calculateLength([lastPosition, data]);
    percentage = Math.abs(currentLength / fullLength) * 100;

    pubsub.publish({ coordinate: data, routeDetails: {
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
