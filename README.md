# toksik
![npm](https://img.shields.io/npm/dt/toksik?style=plastic)
![npm](https://img.shields.io/npm/v/toksik?style=plastic)
![npm bundle size (version)](https://img.shields.io/bundlephobia/min/toksik/2.0.0?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/InkyzProd/toksik?style=plastic)

Toksik is a simple and flexible package for filtering messages containing bad words.
## installation
```sh
npm install toksik
```

## usage
```js
const Words = require('toksik');
const word = new Words();

console.log(word.isToxic('muka mu seperti lonte')); // return true
console.log(word.isToxic('muka mu seperti bidadari')); // return false

console.log(word.censor('muka mu seperti lonte')); // muka mu seperti *****
console.log(word.censor('muka mu seperti bidadari')); // muka mu seperti bidadari
// You can also change custom characters
console.log(word.censor('muka mu seperti lonte', '•')) // muka mu seperti •••••

console.log(word.filter('muka mu seperti lonte')); // muka mu seperti
console.log(word.filter('muka mu seperti bidadari')); // muka mu seperti bidadari

console.log(word.analyze('muka mu seperti lonte')); // { isToxic: true, toxicList: [ 'lonte' ] }
console.log(word.analyze('muka mu seperti bidadari')); // { isToxic: false, toxicList: [] }
```

## functions
> `isToxic` = Returns true if the text contains an abusive word, and returns false if the text does not contain an abusive word.
>
> `censor` = Replace badwords to `*`
> 
> `filter` = Delete text that contains badwords
> 
> `analyze` = Provides a list of all bad words if the text contains dirty words

## license
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## contribution
you can contribute badwords for [words.json](https://github.com/InkyzProd/toksik/blob/0c7da8eafbacc5aa39cc6c940a7f5f6d99b3b794/src/words.json) thank you!

## Thank you for using this package!
