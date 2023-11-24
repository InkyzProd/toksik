const fs = require('fs');
const path = require('path');

class Words {
  constructor(filePath = 'words.json') {
    try {
      this.words = this.loadToxic(filePath);
    } catch (error) {
      this.handleLoadError(error);
      this.words = [];
    }
  }

  loadToxic(filePath) {
    const fullPath = path.join(__dirname, filePath);
    try {
      const wordsJson = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(wordsJson).words;
    } catch (error) {
      const errorMessage = `Error loading words\nReason: ${error.message}`;
      console.error(errorMessage);
      throw new Error('Failed to load toxic words');
    }
  }

  validateFunction(funcName) {
    if (!(funcName in this)) {
      const errorMessage = `Oh no! Function '${funcName}' seems to have vanished into the void of non-existence.`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  handleLoadError(error) {
    const errorMessage = `Error initializing Words\nReason: ${error.message}`;
    console.error(errorMessage);
  }

  isToxic(text) {
    try {
      this.validateFunction('isToxic');
      const regex = new RegExp('\\b(' + this.words.join('|') + ')\\b', 'i');
      return regex.test(text);
    } catch (error) {
      const errorMessage = `Error checking words\nReason: ${error.message}`;
      console.error(errorMessage);
      return false;
    }
  }

  censor(text, censorChar = '*') {
    try {
      this.validateFunction('censor');
      const foundWordsMap = this.findMatchingWords(text);

      foundWordsMap.forEach((matches, word) => {
        matches.forEach(match => {
          const replacement  = censorChar.repeat(match.length);
          text = text.replace(match, replacement);
        });
      });

      return text;
    } catch (error) {
      const errorMessage = `Error censoring text\nReason: ${error.message}`;
      console.error(errorMessage);
      return text;
    }
  }

  filter(text) {
    try {
      this.validateFunction('filter');
      this.words.forEach(word => {
        const reg = new RegExp('\\b' + word + '\\b', 'gi');
        text = text.replace(reg, '');
      });
      return text.trim();
    } catch (error) {
      const errorMessage = `Error filtering text\nReason: ${error.message}`;
      console.error(errorMessage);
      return text.trim();
    }
  }

  analyze(text) {
    try {
      this.validateFunction('analyze');
      const foundWords = this.words.filter(word => text.includes(word));
      return {
        isToxic: foundWords.length > 0,
        toxicList: foundWords,
      };
    } catch (error) {
      const errorMessage = `Error analyzing text\nReason: ${error.message}`;
      console.error(errorMessage);
      return {
        isToxic: false,
        toxicList: [],
      };
    }
  }

  findMatchingWords(message) {
    try {
      this.validateFunction('findMatchingWords');
      const foundWordsMap = new Map();

      this.words.forEach(word => {
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        const matches = message.match(regex);
        if (matches) {
          foundWordsMap.set(word, matches);
        }
      });

      return foundWordsMap;
    } catch (error) {
      const errorMessage = `Error finding matching words\nReason: ${error.message}`;
      console.error(errorMessage);
      return new Map();
    }
  }
}

module.exports = Words;
