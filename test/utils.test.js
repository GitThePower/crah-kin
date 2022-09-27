const utils = require('../src/utils');

test('getMessageSignature should return a string', () => {
  const path = 'some/path/';
  const request = {
    someParam: 'someValue'
  };
  const secret = 'someSecret';
  const nonce = 0;

  const apiSign = utils.getMessageSignature(path, request, secret, nonce);
  expect(typeof apiSign === 'string');
});


test('getNonce should return an unsigned 64-bit integer', () => {
  const nonce = utils.getNonce();
  expect(typeof nonce === 'number');
  expect(nonce >= 0);
});

test('getNonce should be always increasing', () => {
  const nonce1 = utils.getNonce();
  const nonce2 = utils.getNonce();
  expect(nonce2 > nonce1);
});
