import { ContentType, ILoggingConnector, SDK } from 'crewdle';

const credentials = {
  id: 'crewdleUser',
  displayName: 'crewdleUser',
  email: 'crewdleUser@crewdle.com'
}

// This is used to define the structure of the messages that can pass through the Pub/Sub
interface IChatMessage {
  message: string;
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
const cluster = await sdk.joinCluster('CLUSTER_ID');
await sdk.authenticateUser(credentials);

// Open a Pub/Sub for the chat with the structure defined in the interface
const pubsub = cluster.openPubSubTopic<IChatMessage>('pubSub');

// Subscribe to the Pub/Sub for messages
pubsub.subscribe(ContentType.Data, (userId: string, content: IChatMessage) => {
  console.log(`${userId} sent a message that reads ${content.message}`)
});

// Subscribe to the Pub/Sub for files
pubsub.subscribe(ContentType.File, (userId: string, content: File) => {
  console.log(`${userId} sent a file with the name ${content.name}`)
});

// Publish a message to the Pub/Sub
pubsub.publish({ message: 'Hello Crewdle users' })
// Publish a file to the Pub/Sub
pubsub.publish(new File(['Writing', 'a', 'file'], 'crewdleFile'), ['crewdleUser2', 'crewdleUser3'])

// Unsubscribe from the Pub/Sub
pubsub.unsubscribe(ContentType.Data)
pubsub.unsubscribe(ContentType.File)

// Close the Pub/Sub
pubsub.close()
