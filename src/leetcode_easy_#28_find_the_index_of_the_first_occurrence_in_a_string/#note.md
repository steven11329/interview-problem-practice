# 28. Find the Index of the First Occurrence in a String - 解法分析

## 題目理解
- 在 `haystack` 中找 `needle` 第一次出現的起始 index，找不到回傳 `-1`

## basic.ts - `strStr`（暴力法，回溯版）
**做法**：只用一個外層迴圈變數 `i`，比對失敗時把 `i` 減去目前已匹配長度 `needleIndex`（`i = i - needleIndex`），再讓 `needleIndex` 歸零，靠 for 迴圈本身的 `i++` 回到「上一次起始位置 + 1」重新掃描。

**正確性驗證**：手動追蹤多組案例（重疊字元如 `mississippi`/`issip`、needle 剛好在結尾才匹配等）都得到正確結果。本質上等價於標準暴力法「每次失敗就把起始位置往右移一格再整段重掃」，只是用同一個變數兼職「掃描位置」與「回溯起點」，沒有 bug，但可讀性較差。

**複雜度**：時間 O(n×m)（最壞情況會重複掃描已匹配過的字元），空間 O(1)。

## basic.ts - `strStrV2`（暴力法，可讀版）
把回溯邏輯拆成明確的雙指標：外層 `start` 指標記錄目前嘗試的起始位置，內層 `while` 用 `j` 比對 `needle`。與 `strStr` 邏輯完全等價、複雜度相同，差別只在可讀性——不用重複利用迴圈變數做回溯。

```ts
function strStrV2(haystack: string, needle: string): number {
  for (let start = 0; start + needle.length <= haystack.length; start++) {
    let j = 0;
    while (j < needle.length && haystack[start + j] === needle[j]) j++;
    if (j === needle.length) return start;
  }

  return -1;
}
```

## improved.ts - KMP 演算法（最佳解）
分兩階段：

**1. `buildLps`：建立 LPS 陣列**
`lps[k]` = `pattern[0..k]` 這段字串中，最長的「同時是 prefix 也是 suffix」的長度（不含整段自己）。

- **prefix（前綴）**：從最前面開始連續往後數幾個字
- **suffix（後綴）**：從最後面開始連續往前數幾個字
- 白話理解：找一段「頭幾個字」跟「尾幾個字」長得一模一樣的最長長度。例如 `abcab` 的頭兩個字 `ab` 跟尾兩個字 `ab` 一樣，所以 `lps` 在該位置是 `2`
- 用途：比對失敗時，靠這個數字知道「前面比過的這段裡，頭尾重複的部分可以直接跳過」，不用整個從頭重比

**2. 主掃描：雙指標 `i`（haystack）、`j`（needle）**
- 相符：`i++`, `j++`；`j === needle.length` 代表整個 needle 比對成功，回傳 `i - j`
- 不符且 `j > 0`：`j = lps[j - 1]`，利用已匹配片段的頭尾重複特性跳過重複比較，**`i` 完全不回退**
- 不符且 `j === 0`：`i++`，換下一個字元重新試

跟 `strStr`/`strStrV2` 最大的差異：暴力法失敗時要讓起始位置往右移一格、整段重比；KMP 靠 `lps` 讓 `i` 從頭到尾只往前走一次，不會回頭。

## 複雜度比較
| | `strStr` / `strStrV2`（暴力法） | `improved.ts`（KMP） |
|---|---|---|
| 時間 | O(n×m) | O(n+m) |
| 空間 | O(1) | O(m)（`lps` 陣列） |
| `haystack` 指標 `i` | 失敗時會回退重掃 | 只前進，不回退 |

三者都通過相同的測試案例（`sadbutsad`/`sad`、`leetcode`/`leeto`、`leetcode`/`etco`、`mississippi`/`issip`、`aaa`/`aaaa`），對照題目限制（長度 ≤ 10⁴），暴力法也能過，但 KMP 是漸進最優解。

## 為什麼題目定為 Easy
LeetCode 的難度分級看的是「用直覺解法能否在時限內通過」，不是「理論最優解有多難」。本題 constraints 是長度 ≤ 10⁴，暴力法 O(n×m) 最壞約 10⁸ 次比較，在時限內可以 Accepted，所以即使背後存在 KMP 這種需要專門學習的最優解，題目仍歸類 Easy。若把長度上限拉高到 10⁶ 且收緊時限，暴力法會 TLE，題目就會被歸類成 Medium/Hard，逼你非用線性解法不可。

## 實務應用場景
KMP 這類「單一 pattern、逐字掃描」的字串比對演算法，適合用在**手上已有一份固定文字、需要即時找某個字串**的場景：

- **文字編輯器 / IDE 的尋找功能**：如 VSCode 的 Cmd+F，本質就是子字串搜尋（實際可能用 Boyer-Moore 或 Two-Way Algorithm 等變形，但核心問題相同）
- **`grep` 這類指令列工具**：在大量文字裡找 pattern
- **防毒軟體 / 入侵偵測系統（如 Snort）**：掃描檔案或封包裡是否出現已知的病毒特徵碼；因為通常要同時比對大量 pattern，實務上會用 KMP 的多模式版本——**Aho-Corasick 演算法**
- **生物資訊學**：在 DNA/RNA 序列裡找特定基因片段
- **論文抄襲檢測**：判斷文字是否出現在另一份文件裡

**要注意的區別**：像 Google 這種大型搜尋引擎的「關鍵字搜尋」，並不是即時對每篇文章跑 KMP，而是事先建好**倒排索引（Inverted Index）**，查詢時直接查表。KMP 適合「即時掃描固定文字」，不是「大規模、事先建索引」的搜尋引擎場景。
