import { decodeMessage } from './index';

test('standard encoding methods are supported', () => {
  const template = 'Dear {{ name }}, your shipment ({{ gift }}) has already visited two cities in {{ loc }}!';
  const values = { name: 'b64:UGF1bGE=', gift: 'c13:ovplpyr', loc: 'uri:Netherlands%3A%20Amsterdam%20%26%20Rotterdam' };
  const result = decodeMessage(template, values);
  expect(result).toBe('Dear Paula, your shipment (bicycle) has already visited two cities in Netherlands: Amsterdam & Rotterdam!');
});

test('unknown encoding methods are ignored', () => {
  const template = 'The kid that I\'m going to ignore this year is called {{ name }}!';
  const values = { name: 'abc:d#$fe300dA' };
  const result = decodeMessage(template, values);
  expect(result).toBe('The kid that I\'m going to ignore this year is called !');
})

test('placeholders are ignored if not present in values', () => {
  const template = 'I started my journey at {{ location }}!';
  const values = { };
  const result = decodeMessage(template, values);
  expect(result).toBe('I started my journey at !');
});
