function isAnagram(s: string, t: string): boolean {
  if (t.length !== s.length) return false;

  const sMap = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    if (sMap.get(s[i]) === undefined) {
      sMap.set(s[i], 1);
    } else {
      sMap.set(s[i], sMap.get(s[i]) as number + 1);
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (sMap.has(t[i])) {
      if ((sMap.get(t[i]) as number - 1) < 0) {
        return false;
      }
      sMap.set(t[i], sMap.get(t[i]) as number - 1);
    } else {
      return false;
    }
  }

  return true;
};

console.assert(isAnagram('anagram', 'nagaram') === true);
console.assert(isAnagram('rat', 'car') === false);
console.assert(isAnagram('ab', 'a') === false);
console.assert(isAnagram('aacc', 'ccac') === false);