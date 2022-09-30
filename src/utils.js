const crypto = require("crypto");
const qs = require('qs');

const getMessageSignature = (path, request, secret, nonce) => {
    const message       = qs.stringify(request);
    const secret_buffer = new Buffer.from(secret, 'base64');
    const hash          = new crypto.createHash('sha512');
    const hmac          = new crypto.createHmac('sha512', secret_buffer);
    const hash_digest   = hash.update(nonce + message).digest('binary');
    const hmac_digest   = hmac.update(path + hash_digest, 'binary').digest('base64');

    return hmac_digest;
};

const getNonce = () => {
    return Date.now();
};

const handleResponse = (response) => {
  const { data } = response;
  if (!data) {
    throw new Error(config.GET_TICKER_INFO_NO_DATA);
  }

  const { error, result } = data;
  if (result) {
    return result[Object.keys(result)[0]]
  }
  throw new Error(JSON.stringify(error));
};

module.exports = {
  getMessageSignature,
  getNonce,
  handleResponse,
};
