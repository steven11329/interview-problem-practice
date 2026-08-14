function majorityElement(nums: number[]): number {
  const map = new Map<number, number>();
  nums.forEach((n) => {
    if (!map.has(n)) {
      map.set(n, 1);
    } else {
      map.set(n, map.get(n) as number + 1);
    }
  });

  let maxN = 0;
  let max = 0;

  Array.from(map.entries()).forEach(([n, m]) => {
    if (max < m) {
      max = m;
      maxN = n;
    }
  });

  return maxN;
};

console.assert(majorityElement([3, 2, 3]) === 3);
console.assert(majorityElement([2, 2, 1, 1, 1, 2, 2]) === 2);