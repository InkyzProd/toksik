const fs = require('fs');

function loadToxic() {
  try {
    const wordsJson = fs.readFileSync('words.json', 'utf8');
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
