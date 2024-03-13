// Crewdle Chat Application Sample

// This file defines core functionalities for the Crewdle chat application sample.
// It demonstatres the base abilities of the Crewdle SDK, including the
// handling of object stores, key-value database interactions, and utilities
// for query and schema building. It serves as a part of the SDK integration layer.

// SDK and Interface Imports
import {
  DatabaseEvent,
  IDatabaseEvent,
  IDatabaseTable, IValueType,
  LayoutBuilder,
  QueryBuilder,
  SDK
} from '@crewdle/web-sdk';

import { vendorId, accessToken } from '../credentials';
import { IFile } from '../chat/helpers';
import { removeMessage, renderMessage, updateMessage } from './helpers';

const KeyValueDatabase = {
  timestamp: () => Date.now(),
};

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

let chatTable: IDatabaseTable<IChatMessage>;
let userTable: IDatabaseTable<User>;

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
  chatTable = database.getTable<IChatMessage>('chat');
  userTable = database.getTable<User>('users');

  // Subscribe to the database
  database.subscribe(async ({ event }: IDatabaseEvent) => {
    if (event !== DatabaseEvent.SyncComplete) {
      return;
    }

    // Count the total number of messages
    const messageCount = await chatTable.count();

    // Calculate the offset value if there are more than 100 messages
    const offsetValue = messageCount - 100 < 0 ? 0 : messageCount - 100;

    // Build the query
    const query = QueryBuilder
      // Get the messages by timestamps
      .index('timestamp')
      // in ascending order
      .orderBy('asc')
      // with the offset value allowing us to skip the first messages up to the last 100
      .offset(offsetValue)
      // and return a maximum of 100 messages
      .limit(100);

    // List the last 100 messages sent
    const lastMessages = await chatTable.list(query);

    // Sort the messages by timestamp and render them
    for (const { id, senderId, message, timestamp, file } of lastMessages) {
      // Utils to render the HTML for each message
      renderMessage(objectStore, id, userId, senderId, message, timestamp, file);
    }


    // Subscribe to the chat table to listen for new messages
    chatTable.subscribe(({ action, value: { id, senderId, message, timestamp, file } }) => {
      if (action === 'delete') {
        removeMessage(id);

        return;
      }

      if (action === 'update') {
        updateMessage(id, message, senderId, timestamp);

        return;
      }

      // Render the message
      renderMessage(objectStore, id, userId, senderId, message, timestamp, file);
    });
  });
}
