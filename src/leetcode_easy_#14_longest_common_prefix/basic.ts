function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 1) return strs[0];

  let lcp = '';
  for (let i = 0; i < strs[0].length; i++) {
    let isAllMatch = true;
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== strs[0][i]) {
        isAllMatch = false;
        break;
      }
    }
    if (isAllMatch) {
      lcp += strs[0][i];
    } else {
      return lcp;
    }
  }

  return lcp;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["flower", "flow", "lower"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));
console.log(longestCommonPrefix(["a"]));
console.log(longestCommonPrefix(["reflower", "flow", "flight"]));