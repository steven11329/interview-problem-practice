function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let merged: number[] = [];
  let i1 = 0;
  let i2 = 0;

  while (i1 < m && i2 < n) {
    if (nums1[i1] < nums2[i2]) {
      merged.push(nums1[i1]);
      i1++;
    } else if (nums1[i1] == nums2[i2]) {
      merged.push(nums1[i1]);
      merged.push(nums2[i2]);
      i1++;
      i2++;
    } else {
      merged.push(nums2[i2]);
      i2++;
    }
  }

  if (i1 == m && i2 !== n) {
    for (let i = i2; i < n; i++) {
      merged.push(nums2[i]);
    }
  } else if (i1 !== m && i2 == n) {
    for (let i = i1; i < m; i++) {
      merged.push(nums1[i]);
    }
  }

  for (let i = 0; i < m + n; i++) {
    nums1[i] = merged[i];
  }
};

// let nums1 = [1, 2, 3, 0, 0, 0];
// let nums2 = [2, 5, 6];
// merge(nums1, 3, nums2, 3);
// console.log(nums1);

// nums1 = [1];
// nums2 = [];
// merge(nums1, 1, nums2, 0);
// console.log(nums1);

// nums1 = [0];
// nums2 = [1];
// merge(nums1, 0, nums2, 1);
// console.log(nums1);