import { ILoggingConnector, PayloadAction, StorageEventType } from '@crewdle/web-sdk-types';
import { SDK } from '@crewdle/web-sdk';

const credentials = {
  id: 'crewdleUser',
  displayName: 'crewdleUser',
  email: 'crewdleUser@crewdle.com'
}

const loggingConnector: ILoggingConnector = {
  log: (message: string, data: any) => {},
  error: (message: string, data: any) => {},
  warn: (message: string, data: any) => {},
};

const options = {
  // Audio context for audio processing
  audioContext: new AudioContext(),
  // The interval hack ensures the intervals are run at the correct time. Disabling it will make the intervals unpredictable.
  disableIntervalHack: true,
  // Custom logging connector for logging events
  loggingConnector: loggingConnector,
  // Maximum number of outgoing subscriptions
  maxOutgoingSubscriptions: 3,
  // Minimum number of initial connections
  minConnections: 3,
  // Maximum distance between two users
  maxDistance: 10,
}

// Create a new SDK instance with specific options
const sdk = await SDK.getInstance('CREWDLE_VENDOR_ID', 'CREWDLE_ACCESS_TOKEN', options);
await sdk.authenticateUser(credentials);
const cluster = await sdk.joinCluster('CLUSTER_ID');

// Open an object store bucket with a specific name
const objectStoreLabel = 'object-store-label';
const objectStore = await cluster.openObjectStoreBucket(objectStoreLabel);

// Subscribe to the object store for events
objectStore.subscribe(objectStoreLabel, ({ event, payload}) => {
  switch (event) {
    // Fired when a new file is written or updated
    case StorageEventType.FileWrite:
      console.log('FileWrite', payload.file);
      break;
    // Fired when a file is deleted
    case StorageEventType.FileDelete:
      console.log('FileDelete', payload.pathName);
      break;
    // Fired when a file is moved or renamed
    case StorageEventType.FileMove:
      console.log('FileMove', payload.pathName, payload.oldPathName);
      break;
    // Fired when a new folder is created
    case StorageEventType.FolderCreate:
      console.log('FolderCreate', payload.folder);
      break;
    // Fired when a folder is deleted
    case StorageEventType.FolderDelete:
      console.log('FolderDelete', payload.pathName);
      break;
    // Fired when a folder is moved or renamed
    case StorageEventType.FolderMove:
      console.log('FolderMove', payload.pathName, payload.oldPathName);
      break;
  }
});

const file = new File(['Writing', 'a', 'file'], 'crewdleFile');
const path = '/';
const newPath = '/newPath';

// Publish a file to the object store with a specific path
await objectStore.publish({ action: PayloadAction.File, file, path });
// Publish a folder to the object store with a specific path
await objectStore.publish({ action: PayloadAction.Folder, path: `${path}crewdle-folder`});
// Move a file to a new path
await objectStore.publish({ action: PayloadAction.Move, path, newPath });

// Unpublish a file from the object store effectively deleting it
await objectStore.unpublish(newPath);

// List the files and folders in the object store at a specific path
await objectStore.list(newPath);
await objectStore.list(path, { recursive: true, includeSyncingFiles: false });

// Get a file from the object store at a specific path
const object = await objectStore.get(newPath);

// Unsubscribe from the object store
objectStore.unsubscribe(objectStoreLabel);

// Close the object store
objectStore.close();
