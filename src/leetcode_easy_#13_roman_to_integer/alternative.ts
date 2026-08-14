function valueOf(symbol: string): number {
  switch (symbol) {
    case 'I': return 1;
    case 'V': return 5;
    case 'X': return 10;
    case 'L': return 50;
    case 'C': return 100;
    case 'D': return 500;
    case 'M': return 1000;
    default: return 0;
  }
}

function romanToInt(s: string): number {
  let sum = 0;
  let prevMax = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    const current = valueOf(s[i]);

    if (current < prevMax) {
      sum -= current;
    } else {
      sum += current;
      prevMax = current;
    }
  }

  return sum;
}

console.log(romanToInt('III'));
console.log(romanToInt('LVIII'));
console.log(romanToInt('MCMXCIV'));
