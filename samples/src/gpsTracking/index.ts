// Crewdle GPS Tracking Sample

// This file defines core functionalities for the Crewdle GPS Tracking Sample.
// It demonstatres the base abilities of the Crewdle Pub/Sub.
// It serves as a part of the SDK integration layer.

// SDK and Helpers Imports
import { ContentType } from '@crewdle/web-sdk-types';
import { SDK } from '@crewdle/web-sdk';
import { vendorId, accessToken } from '../credentials'
import { addIframe, initializeMap, IRouteDetails, updateMarkerPosition } from './helpers';
import { LatLngExpression } from 'leaflet';

// This is used to define the structure of the messages that can pass through the Pub/Sub
interface ITrackingMessage {
  coordinate: number[];
  routeDetails: IRouteDetails;
}

let userId: string;
let initialized = false;
let follow = false;

// Load the tracking setup
export async function start(clusterId: string, userIdStart: string, mapType: string) {
  userId = userIdStart;
  if (mapType === 'user-map') {
    follow = true;
  }

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
    const sourceId = userId;

    if (!initialized) {
      initializeMap(content.coordinate as LatLngExpression);
      initialized = true;
    }

    updateMarkerPosition(sourceId, content.coordinate as LatLngExpression, content.routeDetails, follow);
  });

  let routeNb = 3;

  if (mapType === 'user-map') {
    routeNb = 1;
  }

  for (let i = 1; i < routeNb + 1; i++) {
    addIframe(clusterId, `route${i}`);
  }
}
