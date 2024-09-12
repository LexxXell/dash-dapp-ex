const Dash = require('dash');
const { Mnemonic } = Dash.Core;

const generateMnemonic = async () => {
    const mnemonic = new Mnemonic().toString();

    console.log('Mnemonic: ', mnemonic);
};

generateMnemonic().catch(console.error);
