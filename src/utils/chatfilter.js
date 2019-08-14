import * as R from 'ramda';
export class ChatFilter {
    constructor() {
        throw new Error("This is a static class");
    }
    static initialize(game) {
        console.log("Chat Filter Initialized");
        this.game = game;
        this.profanityDictionary = null;
        this.enableWordRemoval(false);
        this.enableChatFilter(true);
    }
    static startProcessing() {
        this.profanityDictionary =
            this.game.cache.getJSON('profanityDictionary');
        console.log(this.profanityDictionary);
    }
    static filterText(text) {
        if (this.isEnabled) {
            const words = R.split(/\s/)(text)
                .filter(word => !R.isEmpty(word));
            if (this.isRemoved === false)
                return this.replaceProfanity(words).join(" ");
            else
                return this.removeProfanity(words).join(" ");
        }
        else {
            return text;
        }
    }
    static sanitizeWord(word) {
    }
    static fixRepeatedLetter(word) {
        const alphabet = [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z'
        ];
    }
    static replaceProfanity(words) {
        return words.map((word) => {
            return this.isProfanity(word) ? word.replace(/\w/ig, "*") : word;
        });
    }
    static removeProfanity(words) {
        return words.filter((word) => !this.isProfanity(word));
    }
    static isProfanity(word) {
        const startLetter = word[0].toLowerCase();
        return this.profanityDictionary[startLetter].some((dictionaryWord) => {
            return new RegExp(word, "i").test(dictionaryWord);
        });
    }
    static profanePercentage(word) {
        if (this.isProfanity(word)) {
            const wordLength = word.length;
        }
        else {
            return 0;
        }
    }
    static enableChatFilter(enable) {
        this.isEnabled = enable;
    }
    static enableWordRemoval(enable) {
        this.isRemoved = enable;
    }
}
