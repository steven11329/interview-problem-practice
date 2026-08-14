function romanToInt(s: string): number {
  const symbolMap = new Map<string, number>([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
  ]);
  let sum = 0;

  for (let i = 0; i < s.length; i++) {
    const current = symbolMap.get(s[i]) as number;
    const next = (i + 1) < s.length ? (symbolMap.get(s[i + 1]) as number) : 0;

    sum += current < next ? -current : current;
  }

  return sum;
};

console.log(romanToInt('III'));
console.log(romanToInt('LVIII'));
console.log(romanToInt('MCMXCIV'));