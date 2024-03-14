// Crewdle Chat Application Sample

// This file defines core functionalities for the Crewdle chat application sample.
// It demonstatres the base abilities of the Crewdle SDK, including the
// handling of object stores, key-value database interactions, and utilities
// for query and layout building. It serves as a part of the SDK integration layer.

// SDK and Interface Imports
import { PayloadAction, IObjectStoreBucket, IDatabaseEvent, IDatabaseTable, IValueType, QueryBuilder, SDK, LayoutBuilder, DatabaseEvent } from 'crewdle';
import { vendorId, accessToken } from '../credentials';

// Helpers
import { IFile, clearMessage, getMessage, readFile, removeMessage, renderTextMessage, updateMessage, updateUserList, setInputListener, editText } from './helpers';

// This is used to define the structure of the chat message in the key-value database table
interface IChatMessage extends IValueType {
  message: string;
  senderId: string;
  timestamp: number;
  file?: IFile;
}

export interface User extends IValueType{
  senderId: string;
  isOnline: boolean;
}

let userId: string;
let chatTable: IDatabaseTable<IChatMessage>;
let userTable: IDatabaseTable<User>;
let objectStore: IObjectStoreBucket;
let updateId = '';

// Load the chat application
export async function start(clusterId: string, userIdStart: string) {
  userId = userIdStart;

  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
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

  // Join the cluster
  const cluster = await sdk.joinCluster(clusterId);

  // Open an object store for the chat
  objectStore = await cluster.openObjectStoreBucket('chat');

  // Initialize a layout for the chat table and open a key-value database
  const layout = LayoutBuilder.layout(2);
  layout
    .table('chat')
    .index('timestamp')
    .index('sender');
  layout
    .table('users')
    .index('senderId')
    .index('isOnline');

  // Fetch the tables for the chat and the users
  const database = await cluster.openKeyValueDatabase('chat', layout);
  chatTable = database.getTable<IChatMessage>('chat');
  userTable = database.getTable<User>('users');

  setInputListener();

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
      renderMessage(id, senderId, message, timestamp, objectStore, userId, file);
    }

    // Subscribe to the chat table
    chatTable.subscribe(({ action, value: { id, senderId, message, timestamp, file } }) => {
      if (action === 'update' || action === 'delete') {
        if (action === 'delete') {
          removeMessage(id);

          return;
        }
        if (action === 'update') {
          updateMessage(id, message, senderId, timestamp);

          return;
        }
      }

      // Render the message
      renderMessage(id, senderId, message, timestamp, objectStore, userId, file);
    });
  });

  // Update the online users if a user joins or leaves the cluster
  cluster.on('user-join', async ({ id }) => {
    updateOnlineUsers(id);
  });


  cluster.on('user-leave', async ({ id }) => {
    userTable.set(id, {
      senderId: id,
      isOnline: false,
    });
    // Update the user list
    const userList = await userTable.list();
    updateUserList(userList);
  });

  updateOnlineUsers(userId);
}

// Send a message to the chat and add it to the chat table
export async function send() {
  const message = getMessage();

  if (message.length === 0) {
    return;
  }

  if (updateId.length > 0) {
    // Get the messages from the chat table and update the message
    const chatMessage = await chatTable.get(updateId)
    if (!chatMessage) {
      return;
    }

    chatMessage.message = message;

    // Using set instead of add allows us to update the message instead of adding a new one
    chatTable.set(updateId, chatMessage);
    updateId = '';

    clearMessage();

    return
  }

  // Get the estimate cluster timestamp from the SDK
  const timestamp = await SDK.timestamp();

  // Add the message to the chat table with a generated unique key
  chatTable.add({
    senderId: userId,
    message,
    timestamp,
    });

    clearMessage()
}

// Send a file to the object store and add it to the chat table
export async function sendFile(event: Event) {
  const file = (event.target as HTMLInputElement).files![0];
  if (!file) {
    return;
  }

  // Publish the file to the object store
  await objectStore.publish({
    action: PayloadAction.File,
    file,
    path: '/',
  });

  // Get a timestamp and add the reference to the file to the chat table
  const timestamp = await SDK.timestamp();
  chatTable.add({
    senderId: userId,
    message: '',
    timestamp,
    file: {
      name: file.name,
      type: file.type,
      path: `/${file.name}`,
    },
  });
}

export async function editMessage(messageId: string) {
  updateId = messageId;
  // Get a message from the chat table using its key
  const initialMessage = (await chatTable.get(messageId))!.message;
  editText(initialMessage);
}

export function deleteMessage(messageId: string) {
  // Delete the message from the chat table using its key
  chatTable.delete(messageId);
}

// Read a file and render it as a message
async function renderFile(file: IFile, senderId: string, timestamp: number, objectStore: IObjectStoreBucket, userId: string) {
  const reader = readFile(file, senderId, userId, timestamp);
  // Get the file from the object store using its path
  const fileObject = await objectStore.get(file.path);
  reader.readAsDataURL(fileObject);
}

// Render a message as either a text message or a file
function renderMessage(id: string, senderId: string, message: string, timestamp: number, objectStore: IObjectStoreBucket, userId: string, file?: IFile) {
  if (file) {
    return renderFile(file, senderId, timestamp, objectStore, userId);
  }

  renderTextMessage(id, message, senderId, timestamp, userId);
}

async function updateOnlineUsers(id: string) {
  // Query the users table to check if the user exists
  const query = QueryBuilder.index('senderId').where('==', id);
  const users = await userTable.list(query)
  const doesUserExist = users.length > 0;

  if (doesUserExist) {
    // If the user exists, update the user's status to online
    await userTable.set(id, {
      senderId: id,
      isOnline: true,
    });
  } else {
    // If the user does not exist, add the user to the list
    await userTable.set(id, {
      senderId: id,
      isOnline: true,
    });
  }
  // Update the user list
  const updatedUserList = await userTable.list();
  updateUserList(updatedUserList);
}
