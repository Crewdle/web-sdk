// Crewdle Chat Application Sample

// This file defines core functionalities for the Crewdle chat application sample.
// It demonstatres the base abilities of the Crewdle SDK, including the
// handling of object stores, key-value database interactions, and utilities
// for query and schema building. It serves as a part of the SDK integration layer.

// SDK and Interface Imports
import {
  DatabaseEvent,
  IDatabaseEvent,
  IValueType,
  LayoutBuilder,
  SDK
} from '@crewdle/web-sdk';

import { vendorId, accessToken } from '../credentials';
import { IFile } from '../chat/helpers';

// This is used to define the structure of the chat message in the key-value database table
interface IChatMessage extends IValueType {
  message: string;
  senderId: string;
  timestamp: number;
  file?: IFile;
}

interface User extends IValueType{
  senderId: string;
  isOnline: boolean;
}

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

  // Open an object store for the chat
  // This is where we will store the files
  const objectStore = await cluster.openObjectStoreBucket('chat');

    // Initialize a schema for the chat table
    const schema = LayoutBuilder.layout(2);
    schema
      .table('chat')
      .index('timestamp')
      .index('sender');
    schema
      .table('users')
      .index('senderId')
      .index('isOnline');

  // Fetch the tables for the chat and the users
  const database = await cluster.openKeyValueDatabase('chat', schema);
  const chatTable = database.getTable<IChatMessage>('chat');
  const userTable = database.getTable<User>('users');

   // Subscribe to the database
   database.subscribe(async ({ event }: IDatabaseEvent) => {
    if (event !== DatabaseEvent.SyncComplete) {
      return;
    }

    // Logic to execute once the database is synced
  });
}
