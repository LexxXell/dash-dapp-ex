require("dotenv").config();
const { initClient } = require("../utils");

async function getAddress() {
  console.log("Client initialization");

  if (!process.env.MNEMONIC) {
    throw new Error("Mnemonic not set");
  }

  if (!process.env.CONTRACT_ID) {
    throw new Error("No contract ID in env");
  }

  if (!process.env.DOCUMENT_NAME) {
    throw new Error("No document name in env");
  }

  const client = initClient();
  const { wallet } = client;

  console.log("Get the first address");

  const account = await wallet.getAccount();
  const address = account.getUnusedAddress().address;

  console.log(`Address: ${address}`);

  await client.disconnect();
}

getAddress().catch(console.error);
