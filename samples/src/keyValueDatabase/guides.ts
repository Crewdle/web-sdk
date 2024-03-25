import { DatabaseEvent, ILoggingConnector, IValueType } from '@crewdle/web-sdk-types';
import { LayoutBuilder, QueryBuilder, SDK } from '@crewdle/web-sdk';

const credentials = {
  id: 'crewdleUser',
  displayName: 'crewdleUser',
  email: 'crewdleUser@crewdle.com'
}

// This is used to define the structure of the tables in the key-value database
interface FirstTableType extends IValueType {
  secondaryKey: string;
  data: string | string[]
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

// Initialize a layout for the key-value database using the LayoutBuilder
const layout = LayoutBuilder.layout(4)
layout
  .table('first-table')
  .index('secondary-key')
layout
  .table('second-table')
  .index('secondary-key')
  .index('additional-index')

// This is the same layout written in JSON format
const layoutJSON = {
  tables: {
    'first-table': {
      indexes: [
        { keyPath: 'secondary-key' },
      ],
    },

    'second-table': {
      indexes: [
        { keyPath: 'secondary-key' },
        { keyPath: 'addtional-index' }
      ],
    },
  },

  version: 4,
}

// Open a key-value database with a specific layout
const keyValueDB = await cluster.openKeyValueDatabase('keyValueDatabase', layout);

// Subscribe to the key-value database for events
keyValueDB.subscribe(async (event) => {
  switch (event.event) {
  // Fired when the database is synced
  case DatabaseEvent.SyncComplete:
    console.log('SyncComplete')
    break;
  }
});

// Fetch the first table from the key-value database
const firstTable = keyValueDB.getTable<FirstTableType>('first-table');
// Subscribe to the first table for events
firstTable.subscribe((event) => {
  switch (event.action) {
    case 'add':
      console.log('AddAction');
      break;
    case 'update':
      console.log('UpdateAction');
      break;
    case 'delete':
      console.log('DeleteAction');
      break;
  }
});

// Build a query using the QueryBuilder where the secondary key is equal to 'crewdle-key' and order the results in ascending order
// limiting the results to 3 and offsetting the results by 1
const query = QueryBuilder
  .index('secondary-key')
  .where('==', 'crewdle-key')
  .orderBy('asc')
  .limit(3)
  .offset(1);

// This is the same query written in JSON format
const queryJSON = {
  where: {
    key: 'secondary-key',
    operator: '==',
    value: 'crewdle-key'
  },
  orderBy: {
    key: 'secondary-key',
    direction: 'asc'
  },
  limit: 3,
  offset: 1,
}

const value = { secondaryKey: 'crewdle-key', data: 'Entering data in the database' };
const key = 'secondary-key';

// Add a value to the first table
const firstObject = await firstTable.add(value);
// Get the object by ID in the first table
const findObjectID = await firstTable.get(firstObject.id);
// Set to the variable value the value at a specified key
await firstTable.set(key, value);

// List the correct values according to a specified query
await firstTable.list(query);
// Count the number of keys in the first table
await firstTable.count();

// Delete a specified key
await firstTable.delete(key);
// Clear the first table
await firstTable.clear();

// Unsubscribe from the first table
firstTable.unsubscribe();

// Unsubscribe from the key-value database
keyValueDB.unsubscribe();

// Close the key-value database
keyValueDB.close();
