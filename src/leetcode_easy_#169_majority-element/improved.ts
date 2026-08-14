function majorityElement(nums: number[]): number {
  let candidate = nums[0];
  let count = 0;

  nums.forEach((n) => {
    if (count === 0) {
      candidate = n;
    }
    count += n === candidate ? 1 : -1;
  });

  return candidate;
};

console.assert(majorityElement([3, 2, 3]) === 3);
console.assert(majorityElement([2, 2, 1, 1, 1, 2, 2]) === 2);
