function isIsomorphic(s: string, t: string): boolean {
  const sToT = new Map<string, string>();
  const tToS = new Map<string, string>();

  for (let i = 0; i < s.length; i++) {
    const sc = s[i];
    const tc = t[i];

    if (sToT.has(sc) && sToT.get(sc) !== tc) return false;
    if (tToS.has(tc) && tToS.get(tc) !== sc) return false;

    sToT.set(sc, tc);
    tToS.set(tc, sc);
  }

  return true;
};

console.assert(isIsomorphic('egg', 'add') === true);
console.assert(isIsomorphic('f11', 'b23') === false);
console.assert(isIsomorphic('paper', 'title') === true);
console.assert(isIsomorphic('', '') === true);
console.assert(isIsomorphic('bbbaaaba', 'aaabbbba') === false);
