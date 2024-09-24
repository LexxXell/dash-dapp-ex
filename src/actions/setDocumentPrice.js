require("dotenv").config();
const bs58 = require("bs58");
const { initClient } = require("../utils");

const projectDocumentName = "Claim";

const doc = {
  taskId: bs58.decode(process.env.MY_TASK_ID),
  amountCredits: 20,
  amountUSD: 500,
};

async function setDocumentPrice() {
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

  if (!process.env.MY_CLAIM_ID) {
    throw new Error("No claim ID in env");
  }

  const client = initClient({ mnemonic });
  const { platform } = client;

  const identity = await platform.identities.get(process.env.CLAIMER_IDENTITY);

  const [document] = await platform.documents.get(
    `contract.${projectDocumentName}`,
    { where: [["$id", "==", process.env.MY_CLAIM_ID]] }
  );

  const documentBatch = {
    setDocumentPrice: [
      {
        documentId: document.getId(),
        price: doc.amountCredits,
      },
    ],
  };

  console.log("Broadcasting Document");
  await platform.documents.broadcast(documentBatch, identity);

  console.log("Done", "\n", `Document at: ${document.getId()}`);
}

setDocumentPrice()
  .catch(console.error)
  .finally(async () => {
    await client.disconnect();
  });
