require("dotenv").config();
const bs58 = require('bs58');
const { initClient } = require("../utils");

const taskDoc = {
  title: "Create data-contract Tasks for Dash",
  description:
    "Create data-contract Tasks for Dash. You need to create documents for Project, Tasks and Claim. Create links between documents. In Claim, add the price of work in Dash and USD.",
  url: "https://github.com/LexxXell",
  projectId: bs58.decode(process.env.MY_PROJECT_ID),
  status: "pending",
};

async function pushDocument() {
  console.log("Client initialization");

  if (!process.env.MNEMONIC) {
    throw new Error("Mnemonic not setted");
  }

  if (!process.env.OWNER_IDENTIFIER) {
    throw new Error("No identity in env :(");
  }

  if (!process.env.CONTRACT_ID) {
    throw new Error("No contract ID in env");
  }

  const projectDocumentName = "Tasks";

  const client = initClient();
  const { platform } = client;

  const identity = await platform.identities.get(process.env.OWNER_IDENTIFIER);
  const identityClaimer = await platform.identities.get(process.env.CLAIMER_IDENTITY);

  const document = await platform.documents.create(
    `contract.${projectDocumentName}`,
    identity,
    { ...taskDoc, assignee: identityClaimer.getId().toBuffer() }
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

pushDocument().catch(console.error);
