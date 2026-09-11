# 290. Word Pattern - 解法分析

## 題目理解
- `pattern` 的每個字元都要能對應到 `s` 中的一個「單字」，且必須是雙向的一一映射（bijection）：
  - 同一個字元只能對應同一個單字
  - 同一個單字只能對應同一個字元
- 本質上跟 [#205 Isomorphic Strings](../leetcode_easy_#205_isomorphic_strings/#note.md) 是同一種問題，差別只在於 #205 是「字元對字元」，這題是「字元對單字」。

## basic.ts - 雙向 Map + 邊掃邊分詞
**做法**
- 用一個迴圈（`i` 從 0 掃到 `s.length`）同時完成「切單字」跟「比對映射」兩件事：遇到非空白字元就累積到 `word`；遇到空白（或掃到字串結尾）就把目前累積的 `word` 拿去跟 `pattern[pIndex]` 做雙向映射檢查，再重置 `word`、`pIndex++`
- 用 `patternToWordMap`（字元 → 單字）與 `wordToPatternMap`（單字 → 字元）兩個 `Map` 分別檢查兩個方向，任一方向矛盾就立刻 `return false`
- 迴圈結束後額外檢查 `pIndex === pattern.length`，用來處理 `s` 的單字數量跟 `pattern` 長度對不上的情況（例如單字比字元多，或比字元少）

**複雜度**
- 時間：O(n)，n 為 `s` 的長度，只掃描一次
- 空間：O(k)，k 為不重複的字元／單字數量

**正確性**：已是這類「雙向一一映射」題目的標準且最優解法，時間/空間複雜度都到位，不需要再優化。

**測試涵蓋**
- 原題三個範例：`abba/dog cat cat dog` → `true`；`abba/dog cat cat fish` → `false`；`aaaa/dog cat cat dog` → `false`
- 額外邊界：`abba/cddc`（`s` 只有一個單字，數量跟 pattern 長度對不上）→ `false`；`abba/dog dog dog dog`（單字重複但 pattern 字元不同）→ `false`

## 與 #205 Isomorphic Strings 的對照
兩題可以用同一套「雙向 Map 邊掃邊檢查」模板解決，只差在分詞方式：

| | #205 Isomorphic Strings | #290 Word Pattern |
|---|---|---|
| 映射對象 | 字元 ↔ 字元 | pattern 字元 ↔ 單字 |
| 分詞方式 | 不需要，逐字元對齊 | 需要用空白切出單字 |
| 核心技巧 | 雙向 `Map<string, string>` 邊掃邊判斷矛盾 | 同左 |
| 時間複雜度 | O(n) | O(n) |

#205 最終版本（`improved.ts`）也是收斂到同樣的雙向映射寫法，這題一次到位直接寫出最優解，等於是把 #205 學到的技巧直接套用過來。
