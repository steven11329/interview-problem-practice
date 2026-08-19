function buildLps(pattern: string): number[] {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i] = 0;
      i++;
    }
  }

  return lps;
}

function strStr(haystack: string, needle: string): number {
  if (needle.length > haystack.length) return -1;

  const lps = buildLps(needle);
  let i = 0;
  let j = 0;

  while (i < haystack.length) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;
      if (j === needle.length) return i - j;
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }

  return -1;
}

console.log(strStr('sadbutsad', 'sad'));
console.log(strStr('leetcode', 'leeto'));
console.log(strStr('leetcode', 'etco'));
console.log(strStr('mississippi', 'issip'));
console.log(strStr('aaa', 'aaaa'));
