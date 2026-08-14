function lengthOfLastWord(s: string): number {
  let p = s.length - 1;

  // 第一步:跳過尾端空白,找到最後一個單字的結尾
  while (p >= 0 && s[p] === ' ') {
    p--;
  }

  // 第二步:從結尾往左數長度,直到遇到空白或走到字串開頭
  let len = 0;
  while (p >= 0 && s[p] !== ' ') {
    len++;
    p--;
  }

  return len;
}

console.log(lengthOfLastWord('Hello World'));
console.log(lengthOfLastWord('   fly me   to   the moon  '));
console.log(lengthOfLastWord('luffy is still joyboy'));
console.log(lengthOfLastWord('Hello'));
console.log(lengthOfLastWord('a'));
