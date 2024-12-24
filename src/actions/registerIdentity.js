require("dotenv").config();
const {initClient} = require("../utils");

// Mnemonic phrase
const mnemonic =
  "";

async function getIdentityKeys() {
  // Create client instance
  const client = initClient({mnemonic});

  try {
    // Connect to the platform
    await client.wallet.getAccount();

    // Get wallet account
    const account = await client.getWalletAccount();

    const {platform} = client;

    // const identity = await platform.identities.register()
    const identity = await platform.identities.get('Mvo9tNQoSAke368k5sSNaTMPeAH93EVrFQ8aXV5bd3j');

    // await client.platform.identities.topUp(identity.getId(), 29000000);
    await platform.names.register('lexxxell.dash', {identity: identity.getId()}, identity)

    // await platform.names.
    // console.log(identity.toJSON());
    // Not enough balance (861030) to cover burn amount of 1000000
  } catch (error) {
    console.error("Error getting identity keys:", error);
  } finally {
    client.disconnect(); // Ensure the client is disconnected
  }
}

getIdentityKeys();