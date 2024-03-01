// Those components acts as different nodes in the cluster and simulate the monitoring of the CPU, memory, and disk usage.
// The monitoring.ts file is the entry point for the monitoring component and the monitoringComponent.ts file is the actual component that is loaded into the iframes.
// Functions used here are the same as in the monitoring.ts file.

import { SDK } from '@crewdle/web-sdk';
import { vendorId, accessToken } from '../credentials'
import { generateData, updateData } from './helpers';

interface IMonitoringMessage {
  values: any;
}

let userIdFrame: string;
let data: any;
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
  const pubsub = cluster.openPubSubTopic<IMonitoringMessage>('monitoring');

  if (userIdFrame === 'cpu') {
    data = generateData(userIdFrame)
  } else if (userIdFrame === 'memory') {
    data = generateData(userIdFrame)
  } else if (userIdFrame === 'disk') {
    data = generateData(userIdFrame)
  }

  setInterval(() => {
    data = updateData(data, userIdFrame);
    // Publish data to Pub/Sub using a payload that matches the interface defined at initialization.
    pubsub.publish({ values: data });
  }, 1000);
}
