// Crewdle Monitoring Console Sample

// This file defines core functionalities for the Crewdle Monitoring Console sample.
// It demonstatres the base abilities of the Crewdle Pub/Sub.
// It serves as a part of the SDK integration layer.

// SDK and Helpers Imports
import { ContentType, SDK } from 'crewdle';
import { vendorId, accessToken } from '../credentials'
import { ICpuData, IDiskData, IMemoryData, updateInfo } from './helpers';
import { updateGraphData } from './graph';

// This is used to define the structure of the messages that can pass through the Pub/Sub
interface IMonitoringMessage {
  values: ICpuData | IMemoryData | IDiskData;
}

let userId: string;

// Load the console
export async function start(clusterId: string, userIdStart: string) {
  userId = userIdStart;

  // Create a new SDK instance with a minimum of 3 connections per user
  const sdk = await SDK.getInstance(vendorId, accessToken, {
    minConnections: 3,
  });

  // Authenticate the user with specific credentials
  await sdk.authenticateUser({
    id: userId,
    displayName: userId,
    email: `${userId}@crewdle.com`,
  });

  const cluster = await sdk.joinCluster(clusterId)
  // Open a Pub/Sub for the monitoring with the structure defined in the interface
  const pubsub = cluster.openPubSubTopic<IMonitoringMessage>('monitoring');

  // Subscribe to the Pub/Sub with data as the content type and user id and content as the callback for further use
  pubsub.subscribe(ContentType.Data, (userId: string, content: IMonitoringMessage) => {
    displayMessage(userId, content);
  });

  // Add iframes for the monitoring to simulate each of the different monitoring components
  await addIframe(clusterId, 'cpu');
  await addIframe(clusterId, 'memory');
  await addIframe(clusterId, 'disk');
}

function displayMessage(userId: string, message: IMonitoringMessage) {
  updateGraphData({
    timestamp: new Date().toLocaleTimeString(),
    usage: message.values.usagePercentage,
  }, userId);
  updateInfo(message.values, userId);
}

// Dynamically add iframes for the monitoring components to act as nodes in the cluster
async function addIframe(clusterId: string, userId: string) {
  const iframe = document.createElement('iframe');
  iframe.id = `iframe-component-${userId}`;
  const user = userId;
  let hostname = window.location.hostname;
  const protocol = window.location.protocol;
  if (hostname === 'localhost') {
    hostname += ':8100';
  }
  const iframeHostname = `${userId}.${hostname}`;
  iframe.src = `${protocol}//${iframeHostname}/monitoring/component?cluster=${clusterId}&user=${user}`;
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  await new Promise((resolve) => {
    setTimeout(resolve, 1);
  });
}

export function changeTab(component: string) {
  document.querySelectorAll('.tabs__content').forEach(tab => {
    const tabElement = tab as HTMLElement;
    tabElement.style.display = 'none';
  });

  document.getElementById(component)!.style.display = 'block';
}
