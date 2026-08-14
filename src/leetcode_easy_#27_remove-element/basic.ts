function removeElement(nums: number[], val: number): number {
  let lIndex = 0;
  let rIndex = nums.length - 1;

  while (lIndex < rIndex) {
    if (nums[lIndex] === val && nums[rIndex] !== val) {
      nums[lIndex] = nums[rIndex];
      nums[rIndex] = val;
      lIndex++;
      rIndex--;
    } else if (nums[lIndex] !== val && nums[rIndex] === val) {
      lIndex++;
    } else if (nums[lIndex] === val && nums[rIndex] === val) {
      rIndex--;
    } else {
      lIndex++
    }
  }

  console.log(nums);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == val) {
      return i;
    }
  }

  return nums.length;
};

console.log(`k=${removeElement([3, 2, 2, 3], 3)}`);
console.log(`k=${removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)}`);
console.log(`k=${removeElement([1], 2)}`);
console.log(`k=${removeElement([], 2)}`);