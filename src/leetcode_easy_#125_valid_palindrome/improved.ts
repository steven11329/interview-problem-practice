function normalizeAlnumCode(charCode: number): number | null {
  const lowerCode = (0x41 <= charCode && charCode <= 0x5a) ? charCode + 32 : charCode;

  if ((0x61 <= lowerCode && lowerCode <= 0x7a) || (0x30 <= lowerCode && lowerCode <= 0x39)) {
    return lowerCode;
  }

  return null;
}

function isPalindrome(s: string): boolean {
  let leftIndex = 0;
  let rightIndex = s.length - 1;

  while (leftIndex < rightIndex) {
    const leftCode = normalizeAlnumCode(s.charCodeAt(leftIndex));
    if (leftCode === null) {
      leftIndex++;
      continue;
    }

    const rightCode = normalizeAlnumCode(s.charCodeAt(rightIndex));
    if (rightCode === null) {
      rightIndex--;
      continue;
    }

    if (leftCode !== rightCode) {
      return false;
    }

    leftIndex++;
    rightIndex--;
  }

  return true;
};

console.log(isPalindrome('A man, a plan, a canal: Panama'));
console.log(isPalindrome('race a car'));
console.log(isPalindrome(' '));
console.log(isPalindrome('s'));
console.log(isPalindrome('0P'));
console.log(isPalindrome('P0'));
