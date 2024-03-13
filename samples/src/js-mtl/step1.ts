// Crewdle Chat Application Sample

// This file defines core functionalities for the Crewdle chat application sample.
// It demonstatres the base abilities of the Crewdle SDK, including the
// handling of object stores, key-value database interactions, and utilities
// for query and schema building. It serves as a part of the SDK integration layer.

// SDK and Interface Imports
import {
  SDK
} from '@crewdle/web-sdk';

import { vendorId, accessToken } from '../credentials';

// Load the chat application
export async function start(clusterId: string, userId: string) {

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

  // Join the cluster
  const cluster = await sdk.joinCluster(clusterId);
}

