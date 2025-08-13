const fs = require('fs');
const path = require('path');

function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(__dirname, filePath);
    try {
      const wordsJson = fs.readFileSync(fullPath, 'utf8');
      const parsed = JSON.parse(wordsJson);
      const list = Array.isArray(parsed.words) ? parsed.words : [];
      const normalized = list
        .filter((item) => typeof item === 'string')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      const uniqueLower = Array.from(new Set(normalized.map((w) => w.toLowerCase())));
      return uniqueLower;
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
      if (!Array.isArray(this.words) || this.words.length === 0) {
        return false;
      }
      const escaped = this.words.map(escapeRegex);
      const regex = new RegExp('\\b(' + escaped.join('|') + ')\\b', 'i');
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
      if (!Array.isArray(this.words) || this.words.length === 0) {
        return text;
      }
      const escaped = this.words.map(escapeRegex);
      const regex = new RegExp('\\b(' + escaped.join('|') + ')\\b', 'gi');
      return text.replace(regex, (match) => censorChar.repeat(match.length));
    } catch (error) {
      const errorMessage = `Error censoring text\nReason: ${error.message}`;
      console.error(errorMessage);
      return text;
    }
  }

  filter(text) {
    try {
      this.validateFunction('filter');
      if (!Array.isArray(this.words) || this.words.length === 0) {
        return text.trim();
      }
      const escaped = this.words.map(escapeRegex);
      const regex = new RegExp('\\b(' + escaped.join('|') + ')\\b', 'gi');
      const cleaned = text
        .replace(regex, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s+([.,!?;:])/g, '$1');
      return cleaned.trim();
    } catch (error) {
      const errorMessage = `Error filtering text\nReason: ${error.message}`;
      console.error(errorMessage);
      return text.trim();
    }
  }

  analyze(text) {
    try {
      this.validateFunction('analyze');
      if (!Array.isArray(this.words) || this.words.length === 0) {
        return {
          isToxic: false,
          toxicList: [],
        };
      }
      const escaped = this.words.map(escapeRegex);
      const regex = new RegExp('\\b(' + escaped.join('|') + ')\\b', 'gi');
      const matches = text.match(regex) || [];
      const unique = Array.from(new Set(matches.map(m => m.toLowerCase())));
      return {
        isToxic: unique.length > 0,
        toxicList: unique,
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
        const regex = new RegExp('\\b' + escapeRegex(word) + '\\b', 'gi');
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
