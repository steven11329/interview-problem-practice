# 392. Is Subsequence - 解法分析

## 題目理解
- 判斷 `s` 是否為 `t` 的子序列（可以刪除 `t` 中任意字元，但不能改變剩餘字元的相對順序）
- Follow-up：如果有大量的 `s1, s2, ..., sk`（k ≥ 10⁹）要逐一對同一個 `t` 做查詢，該怎麼改？

## basic.ts - 雙指標法

**做法**
- `sIndex`、`tIndex` 各自從 0 開始，掃描 `t`：字元相符就兩個指標一起前進，不符就只前進 `tIndex`
- `sIndex` 走到 `s` 的最後一個字元且成功匹配時回傳 `true`

**複雜度**
- 時間：O(t.length)，每次查詢都要重新掃一次 `t`
- 空間：O(1)

**已知邊界問題**
- 當 `s = ""` 時，`sIndex === s.length - 1` 會變成 `0 === -1`，永遠不成立；`s[sIndex]` 也是 `undefined`，跟 `t` 的任何字元都不會相等。結果迴圈掃完 `t` 直接 `return false`，但正確答案應該是 `true`（空字串是任何字串的子序列）。
- 修法：可以加 `if (s.length === 0) return true;` 的 guard clause；或把迴圈條件改成 `while (tIndex < t.length && sIndex < s.length)`，結束後用 `return sIndex === s.length` 判斷，這樣空字串會自然被涵蓋，不需要特判。

**適用場景**：只需要查詢一次（或次數不多）的情境，邏輯直覺、好驗證。

---

## improved.ts - 預處理 + 二分搜尋（解決 Follow-up）

**問題點**：`t` 固定不變，卻要被查詢 k 次；`basic.ts` 每次查詢都重新線性掃描 `t`，總時間變成 O(k × t.length)，當 k ≥ 10⁹ 時會非常慢。

**核心想法**：把「昂貴的工作」搬到只需要做一次的地方——預先處理 `t`，而不是每次查詢都重新掃它（space-time tradeoff）。

**做法**
1. `buildIndexMap(t)`：只執行一次，建立 `字元 → 該字元在 t 中所有出現位置`的 Map。因為是由左到右掃描 `t`，同一字元的 index 陣列天生就是遞增排序。
   - 例：`t = "bcaaz"` → `{b:[0], c:[1], a:[2,3], z:[4]}`
2. `isSubsequence(s, indexMap)`：對每次查詢的 `s`，維護 `prevIndex`（上一個字元在 `t` 中匹配到的位置，初始 -1）。逐一比對 `s` 的每個字元：
   - 從 map 取出該字元的 index 陣列
   - 用 `nextIndexAfter`（二分搜尋 upper bound）找「第一個大於 `prevIndex`」的值
   - 找不到 → 回傳 `false`；找到 → 更新 `prevIndex`，繼續下一個字元
   - 全部字元都成功匹配 → `true`

**為什麼需要存整個 index 陣列，而不是只存第一次出現的位置**
- 重複字元的情境：若 `s` 中同一字元出現多次（如 `"caa"`），第一個 `a` 用掉 index 2 之後，第二個 `a` 必須能跳到「大於 2」的下一個位置 3，而不是重複使用 2。因此每個字元要保留完整的 index 列表，靠二分搜尋動態找「目前指標之後」最近的一個。

**複雜度**
- 預處理 `t`：O(t.length)，只需一次
- 每次查詢 `s`：O(s.length × log(t.length))
- 總時間：O(t.length + k × s.length × log(t.length))，相較 `basic.ts` 的 O(k × t.length)，當 k 很大、`t` 很長時效益非常明顯
- 空間：O(t.length)（存 index map）

**測試涵蓋**
- 原題範例：`s="abc"/t="ahbgdc"` → `true`；`s="axc"/t="ahbgdc"` → `false`
- 重複字元：`t="bcaaz"`（`a` 出現兩次）
  - `s="caa"` → `true`（c→1, a→2, a→3，依序遞增）
  - `s="caaa"` → `false`（`t` 只有兩個 `a`，第三個 `a` 二分搜尋找不到「大於 3」的值）
  - `s="aac"` → `false`（`c` 出現在 index 1，比兩個 `a` 的位置 2、3 都早，順序不對）

## 結論

| | basic.ts（雙指標） | improved.ts（預處理 + 二分搜尋） |
|---|---|---|
| 單次查詢時間 | O(t.length) | O(s.length × log(t.length)) |
| 預處理 | 無 | O(t.length)，只需一次 |
| k 次查詢總時間 | O(k × t.length) | O(t.length + k × s.length × log(t.length)) |
| 空間 | O(1) | O(t.length) |
| 適用情境 | 單次或少量查詢 | 同一個 `t`、大量 `s` 查詢（題目 follow-up 的情境） |

`basic.ts` 邏輯直覺、實作簡單，適合單次判斷；但面對「固定 `t`、海量 `s` 查詢」的場景，重複線性掃描 `t` 會被拖垮，這時候用 index map + 二分搜尋把 `t` 的資訊預先整理好，才能把每次查詢的成本從 O(t.length) 降到 O(s.length × log(t.length))。
