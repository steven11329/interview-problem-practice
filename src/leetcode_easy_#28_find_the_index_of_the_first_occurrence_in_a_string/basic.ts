function strStr(haystack: string, needle: string): number {
  if (needle.length > haystack.length) return -1;

  let needleIndex = 0;

  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[needleIndex]) {
      if (needleIndex === needle.length - 1) {
        return i - (needle.length - 1);
      }
      needleIndex++;
    } else {
      i = i - needleIndex;
      needleIndex = 0;
    }
  }

  return -1;
};

console.log(strStr('sadbutsad', 'sad'));
console.log(strStr('leetcode', 'leeto'));
console.log(strStr('leetcode', 'etco'));
console.log(strStr('mississippi', 'issip'));
console.log(strStr('aaa', 'aaaa'));

// 用獨立的 start/j 指標取代 strStr 中重複利用外層迴圈變數 i 做回溯的寫法，邏輯等價但可讀性更好
function strStrV2(haystack: string, needle: string): number {
  for (let start = 0; start + needle.length <= haystack.length; start++) {
    let j = 0;
    while (j < needle.length && haystack[start + j] === needle[j]) j++;
    if (j === needle.length) return start;
  }

  return -1;
}

console.log(strStrV2('sadbutsad', 'sad'));
console.log(strStrV2('leetcode', 'leeto'));
console.log(strStrV2('leetcode', 'etco'));
console.log(strStrV2('mississippi', 'issip'));
console.log(strStrV2('aaa', 'aaaa'));