import { SDK } from '@crewdle/web-sdk';
import { vendorId, accessToken } from '../credentials';
import { coordinates } from './coordinates';

interface ITrackingMessage {
  coordinate: number[];
}

let userIdFrame: string;
let currentIndex = 0;
let direction = 1;

export async function start(clusterId: string, userId: string) {
  userIdFrame = userId;

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

  setInterval(() => {
    if (currentIndex === coordinates.length || currentIndex === -1) {
      direction *= -1;
      currentIndex += direction;
    }

    const data = coordinates[currentIndex];
    pubsub.publish({ coordinate: data });
    currentIndex += direction;
  }, 1000);
}
