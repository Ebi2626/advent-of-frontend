import { marked } from 'marked';

export interface TextProcessingPlugin {
    processText(text: string): string;
}

export class RemoveWordsPlugin implements TextProcessingPlugin {
    private _forbiddenWords: string[] = [];

    constructor(wordsToRemove: string[]) {
        this._forbiddenWords = wordsToRemove;
    }

    processText(text: string): string {
        this._forbiddenWords.forEach((word) => {
            const wordRegexp = new RegExp(word, 'ig');
            text = text.replace(wordRegexp, '');
        });
        return text;
    }
}

export class ReplaceCharsPlugin implements TextProcessingPlugin {
    private _charsRegister: Record<string, string> = {};

    constructor(charsToReplace: Record<string, string>) {
        this._charsRegister = charsToReplace;
    }

    processText(text: string): string {
        for(let letter in this._charsRegister) {
            const letterRegexp = new RegExp(letter, 'ig');
            text = text.replace(letterRegexp, this._charsRegister[letter]);
        }
        return text;
    }
}

export class MarkdownToHtmlPlugin implements TextProcessingPlugin {
    processText(text: string): string {
        const parsedMarkdown = marked.parse(text, {async: false, }) as string;
        const trimmedMarkdown = parsedMarkdown.slice(3, -5).trim().replace('  ', ' ');
        return trimmedMarkdown;
    }
}

export class TextProcessor {

    private _plugins: TextProcessingPlugin[] = [];

    use(plugin: TextProcessingPlugin) {
        this._plugins.push(plugin);
    };

    process(text: string): string {
        this._plugins.forEach((plugin) => {
            text = plugin.processText(text)
        });
        return text;
    }

}