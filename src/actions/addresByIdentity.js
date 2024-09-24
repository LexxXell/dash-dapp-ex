const Dash = require("dash");

const client = new Dash.Client();

async function getAddressByIdentity(identityId) {
  const { platform } = client;

  // Получаем информацию о Identity
  const identity = await platform.identities.get(identityId);

  if (!identity) {
    throw new Error("Identity not found");
  }

  console.log(`Identity: ${identity.publicKeys}`);

  // Получаем первый публичный ключ из Identity
  const publicKey = identity.publicKeys[0].data;

  // Генерируем адрес из публичного ключа
  const address = Dash.SDK.CryptoAddress.fromPublicKeyBuffer(
    Buffer.from(publicKey, "base64")
  );

  console.log(`Address for identity ${identityId}: ${address}`);
}

getAddressByIdentity("7cBLvT9A6nkU5jPoLak8o97rU4WrARr3xHv7ttFh9n64")
  .catch(console.error)
  .finally(() => client.disconnect());
