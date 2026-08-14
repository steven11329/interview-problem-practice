function removeElement(nums: number[], val: number): number {
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
};

console.log(`k=${removeElement([3, 2, 2, 3], 3)}`);
console.log(`k=${removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)}`);
console.log(`k=${removeElement([1], 2)}`);
console.log(`k=${removeElement([], 2)}`);
console.log(`k=${removeElement([1, 3, 2, 5], 2)}`);
