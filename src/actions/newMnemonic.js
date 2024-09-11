// src/controllers/mnemonicController.js
const Dash = require('dash');
const { Mnemonic } = Dash.Core;

const generateMnemonic = async () => {
    const mnemonic = new Mnemonic().toString();

    // Save the mnemonic in config.json
    console.log('Mnemonic: ', mnemonic);
};

generateMnemonic().catch(console.error);
