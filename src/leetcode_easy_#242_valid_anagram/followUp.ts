function isAnagram(s: string, t: string): boolean {
  const sChars = Array.from(s);
  const tChars = Array.from(t);
  if (sChars.length !== tChars.length) return false;

  const sMap = new Map<string, number>();
  for (const char of sChars) {
    sMap.set(char, (sMap.get(char) ?? 0) + 1);
  }

  for (const char of tChars) {
    const count = sMap.get(char);
    if (count === undefined || count === 0) return false;
    sMap.set(char, count - 1);
  }

  return true;
};

console.assert(isAnagram('anagram', 'nagaram') === true);
console.assert(isAnagram('rat', 'car') === false);
console.assert(isAnagram('ab', 'a') === false);
console.assert(isAnagram('aacc', 'ccac') === false);

// Unicode: 😀 是 surrogate pair（U+1F600），逐 code unit 索引會拆成兩個誤判的字元
console.assert(isAnagram('😀🎉', '🎉😀') === true);
console.assert(isAnagram('😀a', 'a😀') === true);
