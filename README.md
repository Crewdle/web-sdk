# Crewdle Web SDK

## Introduction

Welcome to the Crewdle Web SDK! This toolkit empowers developers to seamlessly integrate Crewdle Mist Computing Platform's cutting-edge features into web applications. Enjoy easy adoption of decentralized computing technologies for real-time data processing, secure peer-to-peer communication, and efficient data handling.

## Why Crewdle Web SDK?

- **Ease of Integration**: Designed for minimal coding effort, enabling quick adoption.
- **Advanced Technologies**: Access to decentralized computing, enhancing security and efficiency.
- **Innovation Friendly**: Ideal for developing scalable, sustainable web applications.

## Getting Started

Before diving in, ensure you have a Vendor ID and an Access Token. Register to the [Crewdle Mist Developer Console](https://dashboard.crewdle.com/signup) if you haven't already.

## Additional Resources

- [Developer Console](https://dashboard.crewdle.com)
- [Integration Guides](https://guides.crewdle.com)
- [SDK Reference](https://docs.crewdle.com)
- [Samples](https://samples.crewdle.com)
- [NPM Package](https://npm.com/@crewdle/web-sdk)
- [Join our Developer Community](https://discord.gg/Nr2ujqCd)

## Installation

```bash
npm install @crewdle/web-sdk
```

## Usage

```TypeScript
// Create a new SDK instance
const sdk = await SDK.getInstance('[VENDOR ID]', '[ACCESS TOKEN]');

// Authenticate a user
await sdk.authenticateUser({
  id: 'userId',
  displayName: 'userId',
  email: 'userId@crewdle.com',
});

// Join a cluster
const cluster = await sdk.joinCluster('clusterId');

// Define the interface of the PubSub topic
interface IChatMessage {
  message: string;
  senderId: string;
  timestamp: number;
  file?: IFile;
}

interface IFile {
  name: string;
  type: string;
  path: string;
}

// Open a PubSub topic
const topic = cluster.openPubSubTopic<IChatMessage>('chat');

// Subscribe to the topic to receive messages
topic.subscribe(ContentType.Data, (sender, message) => {
  console.log(`Received message from ${sender}`, message);
});

// Publish a message to the topic
topic.publish({ message: 'Hello, world!', senderId: 'userId', timestamp: Date.now() });

// Open an object store bucket
const bucket = await cluster.openObjectStoreBucket('drive');

// List the contents of the root directory
const root = await bucket.list('/');
root.forEach((item) => {
  console.log(item);
});

// Publish a file to the bucket
await bucket.publish({
  action: PayloadAction.File,
  file: new File(['Hello, world!'], 'hello.txt'),
});

// Define the layout of the key-value database
const layout = LayoutBuilder.layout(1);
layout
  .table('table1')
  .index('timestamp');

// Open a key-value database
const database = await cluster.openKeyValueDatabase('db', layout);

// Define the interface of the table
interface ITable extends IValueType {
  value: string;
  timestamp: number;
}

// Get the table handle
const table = database.getTable<ITable>('table1');

// Query the table
const query = QueryBuilder.index('timestamp').orderBy('desc').limit(100);
const items = await table.list(query);
items.forEach((item) => {
  console.log(item);
});

// Add an item to the table
await table.add({ value: "value1", timestamp: Date.now() });
```

## Core Features

* PubSub: Real-time, scalable messaging for event-driven communication.
* Object Storage: Secure, scalable storage for unstructured data.
* Key-Value Database: Fast, efficient data storage and retrieval.

## License

Licensed under the Crewdle SDK License Agreement.

## Need Help?

Reach out to support@crewdle.com or raise an issue in our repository for any assistance.

## Join Our Community

For an engaging discussion about your specific use cases or to connect with fellow developers, we invite you to join our Discord community. Follow this link to become a part of our vibrant group: [Join us on Discord](https://discord.gg/XJ3scBYX).
