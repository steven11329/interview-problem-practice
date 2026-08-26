# 125. Valid Palindrome - 解法分析

## 題目理解
- 字串轉小寫、只保留英數字元後，判斷是否為回文
- 全部字元都被過濾掉（如純空白字串 `" "`）視為空字串，屬於回文，回傳 `true`

## basic.ts - 雙指標
**做法**：`leftIndex`、`rightIndex` 從頭尾往中間逼近，用 ASCII 區間判斷字元是否為英數字元（`A-Z`、`a-z`）：
- 不是英數字元：對應指標往內移一格，`continue` 跳過本輪比較
- 是英數字元：大寫先轉小寫，再比較左右兩個字元的 code 是否相等，不等就回傳 `false`

**複雜度**：時間 O(n)、空間 O(1)。已是漸進最優解——至少要把字串掃過一遍才能判斷回文，不可能比 O(n) 更快；也不需要額外配置字串/陣列，O(1) 空間已是下限。

## improved.ts - 抽出共用判斷式 + 先正規化大小寫
**動機**：`basic.ts` 對左右指標各寫了一份幾乎一樣的「英數字元判斷 + 轉小寫」邏輯，條件式偏長且重複。

**做法**：
1. 抽出 `normalizeAlnumCode(charCode)`：先把大寫字母轉小寫（統一大小寫後只需判斷 `a-z`、`0-9` 兩個區間），是英數字元則回傳正規化後的 code，否則回傳 `null`
2. 主迴圈改用 `leftCode === null` / `rightCode === null` 判斷是否要跳過該字元，取代原本重複的巢狀 if/else

```ts
function normalizeAlnumCode(charCode: number): number | null {
  const lowerCode = (0x41 <= charCode && charCode <= 0x5a) ? charCode + 32 : charCode;

  if ((0x61 <= lowerCode && lowerCode <= 0x7a) || (0x30 <= lowerCode && lowerCode <= 0x39)) {
    return lowerCode;
  }

  return null;
}
```

**效果**：左右指標共用同一份判斷邏輯，不用維護兩份重複條件式；複雜度與 `basic.ts` 相同（時間 O(n)、空間 O(1)），純粹是可讀性上的重構。

## 複雜度比較
| | `basic.ts` | `improved.ts` |
|---|---|---|
| 時間 | O(n) | O(n) |
| 空間 | O(1) | O(1) |
| 差異 | 左右指標各自重複一份判斷邏輯 | 抽出共用函式，消除重複 |

兩者都通過相同的測試案例（`"A man, a plan, a canal: Panama"`、`"race a car"`、`" "`、`"s"`、`"0P"`、`"P0"`）。
