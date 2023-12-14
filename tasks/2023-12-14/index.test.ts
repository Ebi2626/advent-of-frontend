import { Gift, calculateMaxGiftValue } from './index';

test('calculateMaxGiftValue returns the maximum value of delivered gifts within weight and volume constraints', () => {
  const gifts = [
    { value: 4, weight: 12, volume: 4 },
    { value: 2, weight: 1, volume: 2 },
    { value: 6, weight: 4, volume: 6 },
    { value: 1, weight: 1, volume: 1 },
    { value: 10, weight: 10, volume: 12 }
  ];
  const maxWeight = 15;
  const maxVolume = 15;
  expect(calculateMaxGiftValue(gifts, maxWeight, maxVolume)).toBe(13);
});

test('calculateMaxGiftValue returns 0 if no gifts can be delivered within weight and volume constraints', () => {
  const gifts = [
    { value: 8, weight: 8, volume: 8 },
    { value: 5, weight: 15, volume: 10 }
  ];
  const maxWeight = 7;
  const maxVolume = 7;
  expect(calculateMaxGiftValue(gifts, maxWeight, maxVolume)).toBe(0);
});

test('calculateMaxGiftValue handles empty gift list', () => {
  const gifts: Gift[] = [];
  const maxWeight = 10;
  const maxVolume = 10;
  expect(calculateMaxGiftValue(gifts, maxWeight, maxVolume)).toBe(0);
});
