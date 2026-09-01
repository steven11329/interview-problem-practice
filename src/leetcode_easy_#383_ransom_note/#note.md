# 383. Ransom Note - 解法分析

## 題目理解
- `ransomNote` 裡的每個字元，都要能從 `magazine` 裡「湊出來」，`magazine` 每個字元只能用一次
- 只要有一個字元不夠用，就回傳 `false`

## basic.ts - `canConstruct`
**做法**：先掃一次 `magazine`，用 `Map<string, number>` 記錄每個字元出現的次數；再掃一次 `ransomNote`，每用掉一個字元就把對應次數減一，次數不夠就回傳 `false`。

**正確性**：邏輯本身沒問題，時間複雜度 O(n+m)、空間 O(1)（字元集固定 26 個），跟最優解在複雜度量級上是一致的。

**可以改進的地方**：
1. **死碼**：`isConstructable` 宣告後只被賦值一次 `true`，從未被改成 `false`（不成立的情況都用 `return false` 直接跳出），所以 `return isConstructable` 永遠回傳 `true`，這段變數是多餘的。
2. **多餘的條件判斷**：
   ```ts
   let value = charMap.get(ransomNote[i]) as number;
   if (charMap.has(ransomNote[i]) && value - 1 >= 0) {
   ```
   如果 `charMap` 沒有該字元，`value` 會是 `undefined`，`undefined - 1` 是 `NaN`，`NaN >= 0` 本來就是 `false`，所以 `charMap.has(...)` 這個判斷跟後面的結果是重複的，可以拿掉，改用 `?? 0` 給預設值即可。
3. **少了提早結束的判斷**：如果 `ransomNote.length > magazine.length`，一定不可能湊出來，可以在最前面直接 `return false`，省下整個計數迴圈。

## improved.ts - 修正版
針對上面三點做調整，資料結構（`Map`）維持不變——這題字元集固定、規模不大（≤ 10⁵），`Map` 換成長度 26 的陣列只是常數因子上的微調，對這種練習題來說沒必要為了這點犧牲可讀性。

```ts
function canConstruct(ransomNote: string, magazine: string): boolean {
  if (ransomNote.length > magazine.length) return false;

  const charMap = new Map<string, number>();

  for (let i = 0; i < magazine.length; i++) {
    charMap.set(magazine[i], (charMap.get(magazine[i]) ?? 0) + 1);
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const value = charMap.get(ransomNote[i]) ?? 0;
    if (value <= 0) return false;
    charMap.set(ransomNote[i], value - 1);
  }

  return true;
}
```

差異：
- 拿掉沒用到的 `isConstructable`，直接在迴圈失敗時 `return false`，成功跑完迴圈就 `return true`
- 用 `?? 0` 取代 `charMap.has(...)` 判斷，邏輯等價但少一次查找、也更直觀
- 開頭加上長度提早判斷，最壞情況（`ransomNote` 明顯比 `magazine` 長）可以直接跳過整個計數流程
- 測試方式從 `console.log` 印結果改成 `console.assert(實際值 === 預期值)`：跑起來沒有任何輸出就代表全部通過，斷言失敗才會印出錯誤，不用自己肉眼比對每一行 log

兩版都通過相同測試案例（`a`/`b`、`aa`/`ab`、`ab`/`ba`、`aa`/`aab`、空字串/`aab`），複雜度同為 O(n+m)，`improved.ts` 差別在可讀性、少數常數次的判斷跟測試斷言方式，不是量級上的優化。
