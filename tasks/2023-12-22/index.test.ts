import { TextProcessor, RemoveWordsPlugin, ReplaceCharsPlugin, MarkdownToHtmlPlugin } from './index';

test('TextProcessor with all plugins should process text correctly', () => {
  const textProcessor = new TextProcessor();
  textProcessor.use(new RemoveWordsPlugin(['naughty', 'coal']));
  textProcessor.use(new ReplaceCharsPlugin({ 'o': '0', 'l': '1' }));
  textProcessor.use(new MarkdownToHtmlPlugin());

  const inputText = 'A naughty child will receive coal. **Merry Christmas!**';
  const expectedOutput = 'A chi1d wi11 receive . <strong>Merry Christmas!</strong>';

  expect(textProcessor.process(inputText)).toBe(expectedOutput);
});

test('TextProcessor with no plugins should return original text', () => {
  const textProcessor = new TextProcessor();
  const inputText = 'Simple text with no changes.';
  expect(textProcessor.process(inputText)).toBe(inputText);
});

test('TextProcessor should handle empty input text', () => {
  const textProcessor = new TextProcessor();
  textProcessor.use(new ReplaceCharsPlugin({ 'a': '@' }));
  expect(textProcessor.process('')).toBe('');
});
