// Crewdle GPS Tracking Sample

// This file defines core functionalities for the Crewdle GPS Tracking Sample.
// It demonstatres the base abilities of the Crewdle Pub/Sub.
// It serves as a part of the SDK integration layer.

// SDK and Helpers Imports
import { ContentType } from '@crewdle/web-sdk-types';
import { SDK } from '@crewdle/web-sdk';
import { vendorId, accessToken } from '../credentials'
import { initializeMap, updateMarkerPosition } from './helpers';
import { LatLngExpression } from 'leaflet';

// This is used to define the structure of the messages that can pass through the Pub/Sub
interface ITrackingMessage {
  coordinate: number[];
}

let userId: string;
let initialized = false;

// Load the tracking setup
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
  // Open a Pub/Sub for the tracking with the structure defined in the interface
  const pubsub = cluster.openPubSubTopic<ITrackingMessage>('tracking');

  // Subscribe to the Pub/Sub with data as the content type and user id and content as the callback for further use
  pubsub.subscribe(ContentType.Data, (userId: string, content: ITrackingMessage) => {
    if (initialized) {
      updateMarkerPosition(content.coordinate as LatLngExpression);
    } else {
      initializeMap(content.coordinate as LatLngExpression);
      initialized = true;
    }
  });

  // Add iframes for the monitoring to simulate each of the different tracking components
  await addIframe(clusterId, 'route1');
}

// Dynamically add iframes for the tracking components to act as nodes in the cluster
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
  iframe.src = `${protocol}//${iframeHostname}/gpsTracking/component?cluster=${clusterId}&user=${user}`;
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  await new Promise((resolve) => {
    setTimeout(resolve, 1);
  });
}
