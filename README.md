# Platform Explorer Data Contract

A simple utility for deploying a date contract that stores identifiers and names/aliases for them.

before launching, you need to enter your data in the `.env` file

---

## Prerequisites

- Node.js 20+

Insert your data in .env
```
npm install
```
---

## Register Identifier
We can register new identifier by this command
```
npm run identity:register
```
**Required env vars:**
* `MNEMONIC`
* `OWNER_IDENTIFIER`
---

## Deploy Contract
We can deploy data-contract from `schema.json` by this command
```
npm run dataContract:deploy
```
**Required env vars:**
* `MNEMONIC`
* `OWNER_IDENTIFIER`
---

## Push Document
We can push document from `document.json` by this command
```
npm run dataContract:deploy
```
**Required env vars:**
* `MNEMONIC`
* `OWNER_IDENTIFIER`
* `DOCUMENT_NAME`
* `CONTRACT_ID`
---

## Get Document
We can retrieve document(s) by document type and owner identifier using the following command:
```
npm run document:get
```
**Required env vars:**
* `MNEMONIC`
* `OWNER_IDENTIFIER`
* `DOCUMENT_NAME`
* `CONTRACT_ID`

This command retrieves documents from the specified contract based on the `DOCUMENT_NAME` and the `OWNER_IDENTIFIER` provided in the `.env` file.

### Example
To get the document, the command will run the `fetchDocuments` function, which retrieves documents from the contract using `platform.documents.get`.

Ensure that the required environment variables are set correctly, and the system is synchronized with the latest blockchain data.

---

## Env Vars
* `MNEMONIC` - wallet mnemonic
* `OWNER_IDENTIFIER` - identifier which be used for interaction with blockchain
* `DOCUMENT_NAME` - name for document
* `CONTRACT_ID` - contract id for push
* `SKIP_SYNCHRONIZATION_BEFORE_HEIGHT` - core property