# 242. Valid Anagram - 解法分析

## 題目理解
- 判斷 `t` 是否為 `s` 的字母重組（anagram）
- Follow-up：如果輸入含 Unicode 字元，該怎麼調整？

## basic.ts - 雜湊表計數
**做法**
- 先比較長度，長度不同直接 `false`
- 用 `Map<string, number>` 統計 `s` 每個字元出現次數
- 遍歷 `t`，對應字元的次數遞減；遇到「表中沒有此字元」或「次數已經是 0 還被扣減」就回傳 `false`
- 遍歷完成沒有提前回傳，代表兩者字元組成完全一致，回傳 `true`

**複雜度**
- 時間：O(s.length + t.length)
- 空間：O(k)，k 為不重複字元數

**正確性**：已是標準且最優解法，時間/空間複雜度都到位，不需要再優化。

**測試涵蓋**
- 原題兩個範例：`anagram/nagaram` → `true`；`rat/car` → `false`
- 額外邊界：`ab/a`（長度不同）→ `false`；`aacc/ccac`（次數不合）→ `false`

---

## followUp.ts - 處理 Unicode（解決 Follow-up）

**問題點**：basic.ts 用 `s[i]` 以 UTF-16 code unit 為單位索引字串。若字元需要用 surrogate pair 表示（例如部分 emoji，如 😀 是 U+1F600），`s[i]` 會把一個邏輯字元拆成兩個 code unit 分別計數，導致誤判。

**做法**
- 改用 `Array.from(s)` / `Array.from(t)`，以迭代器（code point）為單位拆解字串，正確處理 surrogate pair
- 其餘邏輯與 basic.ts 相同：用 `Map<string, number>` 計數、遍歷比對

**複雜度**
- 時間：O(s.length + t.length)，但 `Array.from` 需逐一解碼 code point 並額外配置兩個新陣列，比 basic.ts 直接用索引多一層轉換開銷
- 空間：O(k) 計數表 + O(s.length + t.length) 的暫存陣列（多出來的部分）

**測試涵蓋**
- 沿用 basic.ts 的四組測資
- 額外驗證 surrogate pair：`😀🎉/🎉😀` → `true`；`😀a/a😀` → `true`

## 結論

| | basic.ts | followUp.ts |
|---|---|---|
| 索引方式 | `s[i]`（UTF-16 code unit） | `Array.from(s)`（Unicode code point） |
| 是否支援 surrogate pair 字元 | 否，會誤判 | 是 |
| 額外開銷 | 無 | 多一層迭代器解碼 + 額外陣列配置 |
| 適用情境 | 題目限定小寫英文字母（原始約束） | 需要處理任意 Unicode 字元（含 emoji 等）的情境 |

basic.ts 已經是效能最佳的寫法，但只在「輸入保證是 BMP 內、不需要 surrogate pair」的情況下正確；followUp.ts 犧牲一點點效能，換取對任意 Unicode 字元的正確處理，兩者是「適用範圍」與「速度」的取捨。
