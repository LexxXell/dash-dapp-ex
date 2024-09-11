# Platform Explorer Data Contract

A simple utility for deploying a data contract that stores identifiers and names/aliases for them.

Before launching, you need to enter your data in the `.env` file.

---

## Prerequisites

- Node.js 20+

Insert your data into the `.env` file
```
npm install
```
---

## Register Identifier
You can register a new identifier with this command:
```
npm run identity:register
```
**Required env vars:**
* `MNEMONIC`
* `OWNER_IDENTIFIER`
---

## Deploy Contract
You can deploy the data contract from `schema.json` using this command:
```
npm run dataContract:deploy
```
**Required env vars:**
* `MNEMONIC`
* `OWNER_IDENTIFIER`
---

## Push Document
You can push a document from `document.json` with this command:
```
npm run document:push
```
**Required env vars:**
* `MNEMONIC`
* `OWNER_IDENTIFIER`
* `DOCUMENT_NAME`
* `CONTRACT_ID`
---

## Get Document
You can retrieve document(s) by document type and owner identifier with this command:
```
npm run document:get
```
**Required env vars:**
* `MNEMONIC`
* `OWNER_IDENTIFIER`
* `DOCUMENT_NAME`
* `CONTRACT_ID`

This command retrieves documents from the specified contract based on the `DOCUMENT_NAME` and `OWNER_IDENTIFIER` provided in the `.env` file.

### Example
To get the document, the command will run the `fetchDocuments` function, which retrieves documents from the contract using `platform.documents.get`.

Ensure that the required environment variables are set correctly, and the system is synchronized with the latest blockchain data.

---

## Generate New Mnemonic
You can generate a new mnemonic with this command:
```
npm run dash:new_mnemonic
```

---

## Get Address
You can get the address associated with the mnemonic using this command:
```
npm run dash:address
```
**Required env vars:**
* `MNEMONIC`

---

## Env Vars
* `MNEMONIC` - Wallet mnemonic
* `OWNER_IDENTIFIER` - Identifier used for interaction with the blockchain
* `DOCUMENT_NAME` - Name of the document
* `CONTRACT_ID` - Contract ID for document push
* `SKIP_SYNCHRONIZATION_BEFORE_HEIGHT` - Core property to skip synchronization

---