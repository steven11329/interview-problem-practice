function isIsomorphic(s: string, t: string): boolean {
  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < s.length; j++) {
      if ((s[i] === s[j]) !== (t[i] === t[j])) {
        return false;
      }
    }
  }

  return true;
};

console.assert(isIsomorphic('egg', 'add') === true);
console.assert(isIsomorphic('f11', 'b23') === false);
console.assert(isIsomorphic('paper', 'title') === true);
console.assert(isIsomorphic('', '') === true);
console.assert(isIsomorphic('bbbaaaba', 'aaabbbba') === false);
