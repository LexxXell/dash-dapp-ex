const Dash = require("dash");

function initClient({ mnemonic } = {}) {
  if (!mnemonic) {
    mnemonic = process.env.MNEMONIC;
  }

  const options = {
    network: "testnet",
    dapiAddress: ["https://44.227.137.77:1443"],
    wallet: {
      mnemonic,
    },
  };

  if (process.env.SKIP_SYNCHRONIZATION_BEFORE_HEIGHT) {
    options.wallet.unsafeOptions = {
      skipSynchronizationBeforeHeight: Number(
        process.env.SKIP_SYNCHRONIZATION_BEFORE_HEIGHT
      ),
    };
  }

  if (process.env.CONTRACT_ID) {
    options.apps = {
      contract: {
        contractId: process.env.CONTRACT_ID,
      },
    };
  }

  return new Dash.Client(options);
}

module.exports = { initClient };
