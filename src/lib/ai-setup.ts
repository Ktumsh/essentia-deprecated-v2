import { createCohere } from "@ai-sdk/cohere";

const cohere = createCohere({
  apiKey: process.env.COHERE_API_KEY,
});

export default cohere;
