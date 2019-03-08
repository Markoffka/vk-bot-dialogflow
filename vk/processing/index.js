const natural = require('natural')
const tokenizer = new natural.OrthographyTokenizer({language: "ru"});
const classifier = natural.BayesClassifier(natural.PorterStemmerRu);
module.exports = { tokenizer, classifier }