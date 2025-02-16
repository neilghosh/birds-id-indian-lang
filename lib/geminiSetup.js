const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GoogleGenerativeAI } = require("@google/generative-ai");


const setupGemini = async (projectId, secretId, schema) => {
  const secretName = `projects/${projectId}/secrets/${secretId}/versions/latest`;
  const client = new SecretManagerServiceClient({});
  const [version] = await client.accessSecretVersion({ name: secretName });

  // Extract the payload as a string.
  if (!version.payload || !version.payload.data) {
    throw new Error('Secret payload is empty or undefined.');
  }
  const payload = version.payload.data.toString();

  const genAI = new GoogleGenerativeAI(payload);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema
    },
  });
  return model;
}

module.exports = { setupGemini };
