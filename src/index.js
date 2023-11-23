const fs = require('fs');
const path = require('path');

function loadToxic() {
  try {
    const wordPath = path.join(__dirname, 'words.json');
    const wordsJson = fs.readFileSync(wordPath, 'utf8');
    return JSON.parse(wordsJson).words;
  } catch (error) {
    console.error('Error loading words:', error);
    return [];
  }
}

function isToxic(message) {
  const words = loadToxic();
  const regex = new RegExp('\\b(' + words.join('|') + ')\\b', 'i');
  return regex.test(message);
}

module.exports = { isToxic };
