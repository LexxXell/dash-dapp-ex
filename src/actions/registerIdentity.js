require("dotenv").config();
const { initClient } = require("../utils");

async function createIdentity() {
  console.log("Creating Identity");

  const args = process.argv.slice(2);
  const mnemonicType = args.includes('claimer') ? 'CLAIMER_MNEMONIC' : 'MNEMONIC';

  const mnemonic = process.env[mnemonicType];

  if (!mnemonic) {
    throw new Error(`${mnemonicType} not set`);
  }

  const client = initClient({ mnemonic });

  const identity = await client.platform.identities.register();

  console.log("Done", "\n", `Identity: ${identity.toJSON().id}`);

  await client.disconnect();
}

createIdentity().catch(console.error);
