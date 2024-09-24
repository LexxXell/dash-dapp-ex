const { initClient } = require("../utils");

// Mnemonic phrase
const mnemonic =
  "rescue tomato call picture bean submit teach deliver negative mutual second hole";

async function getIdentityKeys() {
  // Create client instance
  const client = initClient({ mnemonic });

  try {
    // Connect to the platform
    await client.wallet.getAccount();

    // Get wallet account
    const account = await client.getWalletAccount();

    // Get unused identity index
    const identityIndex = await account.getUnusedIdentityIndex();

    // Get private key for identity authentication
    const { privateKey: identityMasterPrivateKey } =
      account.identities.getIdentityHDKeyByIndex(identityIndex, 0);


    console.log(`Private Key: ${identityMasterPrivateKey}`);

  } catch (error) {
    console.error("Error getting identity keys:", error);
  } finally {
    client.disconnect(); // Ensure the client is disconnected
  }
}

getIdentityKeys();
