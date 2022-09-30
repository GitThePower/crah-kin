const config = require('./config');
const request = require('./request');
const utils = require('./utils');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// MARKET DATA FUNCTIONS /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Gets ticker information about an asset pair
 * https://docs.kraken.com/rest/#tag/Market-Data/operation/getTickerInformation
 * @param {String} pair Asset pair (ex. BTCUSD)
 * @returns {Object} ticker information for specified asset pair
 */
const getTickerInformation = async (pair) => {
  const response = await request.get(config.TICKER_INFO_URL + `?pair=${pair}`);
  return utils.handleResponse(response);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// USER TRADING FUNCTIONS /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Adds an order
 * https://docs.kraken.com/rest/#tag/User-Trading/operation/addOrder
 * @param {String} apiKey API Key
 * @param {String} privateKey Private Key
 * @param {Object} options Options for placing an order
 * @returns {Object} Order added response
 */
const addOrder = async (apiKey, privateKey, options) => {
  const nonce = utils.getNonce();
  const params = {
    nonce, 
    ...options,
    validate: true
};

  const response = await request.post(config.ADD_ORDER_URL, params, {
    headers: {
      'API-Key': apiKey,
      'API-Sign': utils.getMessageSignature(config.ADD_ORDER_URL, params, privateKey, nonce),
    }
  });
  return utils.handleResponse(response);
};

/**
 * Adds a market buy order leveraging addOrder function
 * @param {String} apiKey API Key
 * @param {String} privateKey Private Key
 * @param {String} volume Order quantity in terms of the base asset
 * @param {String} pair Asset pair id or altname
 * @returns {Object} Order added response
 */
const addMarketBuyOrder = async (apiKey, privateKey, volume, pair) => await addOrder(apiKey, privateKey, {
  ordertype: 'market',
  type: 'buy',
  volume,
  pair
});

module.exports = {
  addMarketBuyOrder,
  getTickerInformation,
};
