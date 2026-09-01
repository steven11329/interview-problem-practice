function canConstruct(ransomNote: string, magazine: string): boolean {
  const charMap = new Map<string, number>();

  for (let i = 0; i < magazine.length; i++) {
    if (charMap.has(magazine[i])) {
      charMap.set(magazine[i], (charMap.get(magazine[i]) as number) + 1);
    } else {
      charMap.set(magazine[i], 1);
    }
  }

  let isConstructable = true;

  for (let i = 0; i < ransomNote.length; i++) {
    let value = charMap.get(ransomNote[i]) as number;
    if (charMap.has(ransomNote[i]) && value - 1 >= 0) {
      charMap.set(ransomNote[i], value - 1);
    } else {
      return false;
    }
  }

  return isConstructable;
};

console.log(canConstruct('a', 'b'));
console.log(canConstruct('aa', 'ab'));
console.log(canConstruct('ab', 'ba'));
console.log(canConstruct('aa', 'aab'));
console.log(canConstruct('', 'aab'));