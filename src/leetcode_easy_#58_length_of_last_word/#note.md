# 58. Length of Last Word - 解法分析

## basic.ts - 從尾端掃描,用 ASCII code 判斷字母

**做法**
1. 從字串最後一個 index 往左掃
2. 用 `charCodeAt` 取出字元碼,判斷落在 `A-Z`(0x41-0x5A)或 `a-z`(0x61-0x7A)範圍內就當作字母,`len++`
3. 遇到空白(0x20)且 `len > 0` 時,代表已經數完最後一個單字,直接回傳 `len`
4. 迴圈跑完(掃到字串開頭)還沒回傳,代表最後一個單字延伸到 index 0,回傳目前的 `len`

**曾出現的 bug**
最初迴圈寫成 `for (let i = s.length; i > 0; i--)`:
- 起始值 `i = s.length` 超出字串範圍,`s.charCodeAt(s.length)` 會回傳 `NaN`,跟任何數字比較都是 `false`,所以第一輪迴圈什麼事都沒做——這步驟本身無害,但屬於依賴 `NaN` 比較行為的副作用,語意不清楚
- **真正的問題**是條件 `i > 0`,代表 `i === 0`(字串第一個字元)永遠不會進入迴圈體被檢查到。當最後一個單字剛好延伸到字串開頭(例如整個字串只有一個單字、前面沒有空白)時,就會少算第一個字元

**反例**
- `lengthOfLastWord("Hello")`:修正前回傳 `4`(漏掉 `'H'`),應為 `5`
- `lengthOfLastWord("a")`:修正前回傳 `0`,應為 `1`

原本測試的三組範例(`"Hello World"`、`"   fly me   to   the moon  "`、`"luffy is still joyboy"`)都沒踩到這個雷,因為這三個字串的「最後一個單字」前面都還有其他字元或空白,不會延伸到 index 0,所以測試沒發現問題。

修正方式:把迴圈改成 `for (let i = s.length - 1; i > -1; i--)`(等同 `i >= 0`),讓 index 0 也能被檢查到。

**複雜度**
- 時間:O(n)
- 空間:O(1)

**優點**
- 修正後邏輯正確,且只需一次遍歷

**缺點**
- 用 ASCII code 範圍判斷字母,可讀性較低,且把「跳過尾端空白」跟「數字元」兩種目的混在同一個迴圈的 if/else if 分支裡,容易在邊界條件上犯錯(如上述 bug)

---

## alternative.ts - 兩指標法

**做法**
1. 指標 `p` 從字串尾端往左走,**先跳過所有尾端空白**,找到最後一個單字的結尾位置
2. 指標 `p` 繼續往左走,**往左數字元**直到遇到空白或走到字串開頭(`p < 0`),這段距離就是最後一個單字的長度

```ts
function lengthOfLastWord(s: string): number {
  let p = s.length - 1;

  while (p >= 0 && s[p] === ' ') {
    p--;
  }

  let len = 0;
  while (p >= 0 && s[p] !== ' ') {
    len++;
    p--;
  }

  return len;
}
```

**複雜度**
- 時間:O(n)
- 空間:O(1)

**優點**
- 拆成「跳空白」跟「數長度」兩段獨立迴圈,語意清楚,不需要用 ASCII code 判斷字母範圍(題目保證只有英文字母跟空白,直接判斷 `!== ' '` 即可)
- 兩個 `while` 迴圈都用 `p >= 0` 明確處理字串開頭的邊界,不會像 `basic.ts` 一樣漏掉 index 0

**缺點**
- 無明顯缺點,是本題較推薦的寫法

---

## 結論

| | basic.ts | alternative.ts |
|---|---|---|
| 時間複雜度 | O(n) | O(n) |
| 空間複雜度 | O(1) | O(1) |
| 字母判斷方式 | ASCII code 範圍 | 直接比較 `!== ' '` |
| 迴圈結構 | 單迴圈,混合處理跳空白與數長度 | 兩段迴圈,職責分離 |
| 邊界安全性 | 需注意起始/結尾 index,曾因此出過 bug | 兩個 `while` 條件天然涵蓋邊界 |

兩者 Big-O 一樣,`alternative.ts` 的兩指標寫法可讀性更好、邊界處理更直覺,推薦優先使用。

## Edge case 驗證
- `lengthOfLastWord("Hello World")` → `5`
- `lengthOfLastWord("   fly me   to   the moon  ")` → `4`
- `lengthOfLastWord("luffy is still joyboy")` → `6`
- `lengthOfLastWord("Hello")` → `5`(單一單字,測試最後單字延伸到 index 0 的邊界)
- `lengthOfLastWord("a")` → `1`(單一字元,測試最小邊界)
