function lengthOfLastWord(s: string): number {
  let len = 0;
  for (let i = s.length - 1; i > -1; i--) {
    const charCode = s.charCodeAt(i);
    if ((0x40 < charCode && charCode < 0x5b) || (0x60 < charCode && charCode < 0x7b)) {
      len++;
    } else if (charCode === 0x20) {
      if (len > 0) return len;
    }
  }
  return len;
};

console.log(lengthOfLastWord('Hello World'));
console.log(lengthOfLastWord('   fly me   to   the moon  '));
console.log(lengthOfLastWord('luffy is still joyboy'));