require("dotenv").config();
const bs58 = require("bs58");
const { initClient } = require("../utils");

const projectDocumentName = "Claim";

const claimDoc = {
  taskId: bs58.decode(process.env.MY_TASK_ID),
  amountCredits: 20,
  amountUSD: 500,
};

console.log(JSON.stringify(claimDoc, null, 2));

async function pushDocument() {
  console.log("Client initialization");

  const mnemonic = process.env.CLAIMER_MNEMONIC;

  if (!mnemonic) {
    throw new Error("CLAIMER_MNEMONIC not set");
  }

  if (!process.env.CLAIMER_IDENTITY) {
    throw new Error("No CLAIMER identity in env :(");
  }

  if (!process.env.CONTRACT_ID) {
    throw new Error("No contract ID in env");
  }

  const client = initClient({ mnemonic });
  const { platform } = client;

  const identity = await platform.identities.get(process.env.CLAIMER_IDENTITY);

  const document = await platform.documents.create(
    `contract.${projectDocumentName}`,
    identity,
    claimDoc
  );

  const documentBatch = {
    create: [document],
    replace: [],
    delete: [],
  };

  console.log("Broadcasting Document");
  await platform.documents.broadcast(documentBatch, identity);

  console.log("Done", "\n", `Document at: ${document.getId()}`);

  await client.disconnect();
}

// pushDocument().catch(console.error);
