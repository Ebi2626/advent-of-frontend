import { GiftStream } from './index';

test('should correctly map, skip and take values from an array', () => {
  const stream = new GiftStream(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
  const result = stream
    .map((value) => value.toUpperCase())
    .skip(3)
    .take(2)
    .getGifts();
  expect(result).toEqual(['D', 'E']);
});

test('should handle empty array', () => {
  const stream = new GiftStream([]);
  const result = stream.skip(3).take(2).getGifts();
  expect(result).toEqual([]);
});

test('should handle take more than array length', () => {
  const stream = new GiftStream(['a', 'b', 'c']);
  const result = stream.skip(3).take(2).getGifts();
  expect(result).toEqual([]);
});
