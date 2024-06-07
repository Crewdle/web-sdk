import { SDK } from '@crewdle/web-sdk';


const credentials = {
  id: 'crewdleUser',
  displayName: 'crewdleUser',
  email: 'crewdleUser@crewdle.com'
}

// Create a new SDK instance with specific options
const sdk = await SDK.getInstance('CREWDLE_VENDOR_ID', 'CREWDLE_ACCESS_TOKEN');

await sdk.authenticateUser(credentials);

const cluster = await sdk.joinCluster('CLUSTER_ID');

const generativeAIContext = cluster.openGenerativeAIContext('generative-ai-context');

const prompt = 'How do you instantiate a Crewdle Generative AI Context?';

// The AI service will generate a response to the prompt
const output = await generativeAIContext.prompt(prompt);

// You can now use the output as you see fit i.e:
console.log('AI Service Output:', output);

generativeAIContext.close();
