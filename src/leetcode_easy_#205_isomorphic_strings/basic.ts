function isIsomorphic(s: string, t: string): boolean {
  const sMap = new Map<String, number[]>();
  const tMap = new Map<String, number[]>();

  for (let i = 0; i < s.length; i++) {
    if (!sMap.get(s[i])) {
      sMap.set(s[i], [i]);
    } else {
      sMap.get(s[i])?.push(i);
    }

    if (!tMap.get(t[i])) {
      tMap.set(t[i], [i]);
    } else {
      tMap.get(t[i])?.push(i);
    }
  }

  for (let i = 0; i < s.length; i++) {
    const sIndexList = sMap.get(s[i]);
    const tIndexList = tMap.get(t[i]);

    for (let j = 0; j < (sIndexList?.length ?? 0); j++) {
      if (sIndexList?.[j] !== tIndexList?.[j]) {
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
