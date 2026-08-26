function isPalindrome(s: string): boolean {
  let bool = true;
  let leftIndex = 0;
  let rightIndex = s.length - 1;

  while (leftIndex <= rightIndex) {
    let leftCharCode = s.charCodeAt(leftIndex);
    let rightCharCode = s.charCodeAt(rightIndex);

    if ((0x41 <= leftCharCode && leftCharCode <= 0x5a) || (0x61 <= leftCharCode && leftCharCode <= 0x7a) || (0x30 <= leftCharCode && leftCharCode <= 0x39)) {
      if (0x41 <= leftCharCode && leftCharCode <= 0x5a) {
        leftCharCode = leftCharCode + 32;
      }
    } else {
      leftIndex++;
      continue;
    }

    if ((0x41 <= rightCharCode && rightCharCode <= 0x5a) || (0x61 <= rightCharCode && rightCharCode <= 0x7a) || (0x30 <= rightCharCode && rightCharCode <= 0x39)) {
      if (0x41 <= rightCharCode && rightCharCode <= 0x5a) {
        rightCharCode = rightCharCode + 32;
      }
    } else {
      rightIndex--;
      continue;
    }

    // console.log(s[leftIndex], s[rightIndex], leftCharCode, rightCharCode);

    if (leftCharCode !== rightCharCode) {
      bool = false;
      break;
    } else {
      bool = true;
    }

    leftIndex++;
    rightIndex--;
  }

  return bool;
};

console.log(isPalindrome('A man, a plan, a canal: Panama'));
console.log(isPalindrome('race a car'));
console.log(isPalindrome(' '));
console.log(isPalindrome('s'));
console.log(isPalindrome('0P'));
console.log(isPalindrome('P0'));