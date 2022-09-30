const ck = require('../src');
const config = require('../local-config');

test.only('Testing the crah-kin api', async () => {
    const pair = 'MATICUSD';
    try {
        const res1 = await ck.getTickerInformation(pair);
        console.log(res1);
        const res2 = await ck.addMarketBuyOrder(config.ckApiKey, config.ckPrivateKey, '20', pair);
        console.log(res2)
    } catch (e) {
        console.error(e);
    }
});