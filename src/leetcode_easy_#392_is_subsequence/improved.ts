function buildIndexMap(t: string): Map<string, number[]> {
  const indexMap = new Map<string, number[]>();

  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (!indexMap.has(ch)) {
      indexMap.set(ch, []);
    }
    indexMap.get(ch)!.push(i);
  }

  return indexMap;
}

function nextIndexAfter(indices: number[], after: number): number {
  let lo = 0;
  let hi = indices.length;

  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (indices[mid] <= after) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return lo < indices.length ? indices[lo] : -1;
}

function isSubsequence(s: string, indexMap: Map<string, number[]>): boolean {
  let prevIndex = -1;

  for (const ch of s) {
    const indices = indexMap.get(ch);
    if (!indices) return false;

    const found = nextIndexAfter(indices, prevIndex);
    if (found === -1) return false;

    prevIndex = found;
  }

  return true;
}

const t = 'ahbgdc';
const indexMap = buildIndexMap(t);

console.log(isSubsequence('abc', indexMap));
console.log(isSubsequence('axc', indexMap));

const tWithDuplicates = 'bcaaz';
const indexMapWithDuplicates = buildIndexMap(tWithDuplicates);

console.log(isSubsequence('caa', indexMapWithDuplicates));
console.log(isSubsequence('caaa', indexMapWithDuplicates));
console.log(isSubsequence('aac', indexMapWithDuplicates));
