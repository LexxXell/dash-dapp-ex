require("dotenv").config();
const { initClient } = require("../utils");

async function getAddress() {
  console.log("Client initialization");

  const args = process.argv.slice(2);
  const mnemonicType = args.includes("claimer")
    ? "CLAIMER_MNEMONIC"
    : "MNEMONIC";

  const mnemonic = process.env[mnemonicType];

  if (!mnemonic) {
    throw new Error(`${mnemonicType} not set`);
  }

  const client = initClient({ mnemonic });
  const { wallet } = client;

  console.log("Get the first address");

  const account = await wallet.getAccount();
  const address = account.getUnusedAddress().address;

  console.log(`Address: ${address}`);

  await client.disconnect();
}

getAddress().catch(console.error);
