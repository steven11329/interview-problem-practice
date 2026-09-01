function isSubsequence(s: string, t: string): boolean {
  let sIndex = 0;
  let tIndex = 0;

  while (sIndex < s.length && tIndex < t.length) {
    if (t[tIndex] === s[sIndex]) {
      sIndex++;
      tIndex++;
    } else {
      tIndex++;
    }
  }

  return sIndex === s.length;
};

console.log(isSubsequence('abc', 'ahbgdc'));
console.log(isSubsequence('axc', 'ahbgdc'));
console.log(isSubsequence('', 'ahbgdc'));