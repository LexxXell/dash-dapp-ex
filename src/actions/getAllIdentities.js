require("dotenv").config();
const { initClient } = require("../utils");

async function listIdentities() {
  console.log("Listing Identities");

  const args = process.argv.slice(2);
  const mnemonicType = args.includes("claimer")
    ? "CLAIMER_MNEMONIC"
    : "MNEMONIC";

  const mnemonic = process.env[mnemonicType];

  if (!mnemonic) {
    throw new Error(`${mnemonicType} not set`);
  }

  const client = initClient({ mnemonic });
  const account = await client.getWalletAccount();

  // Получаем все идентификации, связанные с аккаунтом
  const identityIds = await account.identities.getIdentityIds();

  console.log("Identities:", identityIds);
}

listIdentities()
  .catch(console.error)
  .finally(await client.disconnect());
