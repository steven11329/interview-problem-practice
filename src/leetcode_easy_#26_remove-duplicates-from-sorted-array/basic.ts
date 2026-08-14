function removeDuplicates(nums: number[]): number {
  let currentIndex = 0;
  for (let i = 0; i < (nums.length - 1); i++) {
    if (nums[i] === nums[i + 1]) {
      continue;
    } else {
      nums[currentIndex] = nums[i]
      currentIndex++;
    }
  }

  nums[currentIndex] = nums[nums.length - 1];
  currentIndex++;

  return currentIndex;
};

console.log(removeDuplicates([1, 1, 2]));
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));