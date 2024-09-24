require("dotenv").config();
const { initClient } = require("../utils");

const projectDocumentName = "Project";

const projectDoc = {
  name: "XellApps",
  description: "We develop backend solutions for our clients.",
  url: "https://github.com/LexxXell",
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

  const client = initClient();
  const { platform } = client;

  const identity = await platform.identities.get(process.env.OWNER_IDENTIFIER);

  const document = await platform.documents.create(
    `contract.${projectDocumentName}`,
    identity,
    projectDoc
  );
  const documentBatch = {
    create: [document],
    replace: [],
    delete: [],
  };

  console.log("Broadcasting Document");
  await platform.documents.broadcast(documentBatch, identity);

  const docId = document.getId();
  const identityId = identity.getId();

  console.log(docId.toBuffer());
  console.log(identityId.toBuffer());

  console.log("Done", "\n", `Document at: ${docId}`);

  await client.disconnect();
}

pushDocument().catch(console.error);
