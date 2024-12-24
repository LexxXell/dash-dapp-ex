require("dotenv").config();
const { initClient } = require("../utils");

async function getAddress() {
  console.log("Client initialization");

  const args = process.argv.slice(2);
  const mnemonicType = args.includes("claimer")
    ? "CLAIMER_MNEMONIC"
    : "MNEMONIC";

  const identityType = args.includes("claimer")
    ? "CLAIMER_IDENTITY"
    : "OWNER_IDENTIFIER";

  const mnemonic = process.env[mnemonicType];
  const identity = process.env[identityType];

  if (!mnemonic) {
    throw new Error(`${mnemonicType} not set`);
  }

  if (!identity) {
    throw new Error(`${identityType} not set`);
  }

  const client = initClient({ mnemonic });

  console.log("Make TopUp Identity balance");

  const { platform } = client;

  await platform.identities.topUp(identity, 100000000);

  console.log(`Success!`);

  await client.disconnect();
}

getAddress().catch(console.error);
