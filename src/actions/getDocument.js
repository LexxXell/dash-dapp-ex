require("dotenv").config();
const { initClient } = require("../utils");

async function fetchDocuments() {
  console.log("Client initialization");

  if (!process.env.MNEMONIC) {
    throw new Error("Mnemonic not set");
  }

  if (!process.env.CONTRACT_ID) {
    throw new Error("No contract ID in env");
  }

  if (!process.env.DOCUMENT_NAME) {
    throw new Error("No document name in env");
  }

  const { platform } = initClient();

  console.log("Fetching documents from contract");

  const documents = await platform.documents.get(
    `contract.${process.env.DOCUMENT_NAME}`,
    {
      where: [],
    }
  );

  if (documents.length === 0) {
    console.log("No documents found");
  } else {
    documents.forEach((doc) => {
      console.log("Document:", doc.toJSON());
    });
  }
}

fetchDocuments().catch(console.error);
