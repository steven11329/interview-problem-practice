function wordPattern(pattern: string, s: string): boolean {
  let pIndex = 0;
  let patternToWordMap = new Map<string, string>();
  let wordToPatternMap = new Map<string, string>();
  let word = '';

  for (let i = 0; i <= s.length; i++) {
    if (i < s.length && s[i] !== ' ') {
      word += s[i];
    } else {
      if (patternToWordMap.get(pattern[pIndex]) === undefined) {
        patternToWordMap.set(pattern[pIndex], word);
      } else {
        if (word !== patternToWordMap.get(pattern[pIndex])) {
          return false;
        }
      }
      if (wordToPatternMap.get(word) === undefined) {
        wordToPatternMap.set(word, pattern[pIndex]);
      } else {
        if (pattern[pIndex] !== wordToPatternMap.get(word)) {
          return false;
        }
      }
      word = '';
      pIndex++;
    }
  }

  if (pIndex !== pattern.length) return false;
  return true;
};

console.assert(wordPattern('abba', 'dog cat cat dog') === true);
console.assert(wordPattern('abba', 'dog cat cat fish') === false);
console.assert(wordPattern('aaaa', 'dog cat cat dog') === false);
console.assert(wordPattern('abba', 'cddc') === false);
console.assert(wordPattern('abba', 'dog dog dog dog') === false);