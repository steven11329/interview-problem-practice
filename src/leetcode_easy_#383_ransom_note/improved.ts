function canConstruct(ransomNote: string, magazine: string): boolean {
  if (ransomNote.length > magazine.length) return false;

  const charMap = new Map<string, number>();

  for (let i = 0; i < magazine.length; i++) {
    charMap.set(magazine[i], (charMap.get(magazine[i]) ?? 0) + 1);
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const value = charMap.get(ransomNote[i]) ?? 0;
    if (value <= 0) return false;
    charMap.set(ransomNote[i], value - 1);
  }

  return true;
}

console.assert(canConstruct('a', 'b') === false);
console.assert(canConstruct('aa', 'ab') === false);
console.assert(canConstruct('ab', 'ba') === true);
console.assert(canConstruct('aa', 'aab') === true);
console.assert(canConstruct('', 'aab') === true);
