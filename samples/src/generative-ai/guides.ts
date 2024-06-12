import { SDK } from '@crewdle/web-sdk';


const credentials = {
  id: 'crewdleUser',
  displayName: 'crewdleUser',
  email: 'crewdleUser@crewdle.com'
}

// Create an instance of the SDK with your vendor ID and access token which can be found in the Account section of the Crewdle dashboard
// Access your account at https://dashboard.crewdle.com/account
const sdk = await SDK.getInstance('CREWDLE_VENDOR_ID', 'CREWDLE_ACCESS_TOKEN');

await sdk.authenticateUser(credentials);

// Join the cluster with the ID of the VPM associated with the AI Context in the Virtual Private Mist section of the Crewdle dashboard
// Configure your VPM at https://dashboard.crewdle.com/virtual-private-mist
const cluster = await sdk.joinCluster('CLUSTER_ID');

// Open a Generative AI Context with the name of the AI Context associated with the VPM in the Generative AI section of the Crewdle dashboard
// Configure your AI Context at https://dashboard.crewdle.com/generative-ai
const generativeAIContext = cluster.openGenerativeAIContext('CONTEXT_ID');

const prompt = 'How do you instantiate a Crewdle Generative AI Context?';

// The AI service will generate a response to the prompt
const output = await generativeAIContext.prompt(prompt);

// You can now use the output as you see fit i.e:
console.log('AI Service Output:', output);

generativeAIContext.close();
