// Follow-up: 如果 nums 是已排序的，可用雙指標將空間複雜度降為 O(1)
// 但因為排序會打亂原始索引，所以需要先記住每個值的原始 index

function twoSumSorted(nums: number[], target: number): number[] {
  const indexed = nums.map((value, index) => ({ value, index }));
  indexed.sort((a, b) => a.value - b.value);

  let left = 0;
  let right = indexed.length - 1;

  while (left < right) {
    const sum = indexed[left].value + indexed[right].value;
    if (sum === target) {
      return [indexed[left].index, indexed[right].index];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

// console.log(twoSumSorted([2, 7, 11, 15], 9));
// console.log(twoSumSorted([3, 2, 4], 6));
// console.log(twoSumSorted([3, 3], 6));
