# 205. Isomorphic Strings - 解法分析

## 題目理解
- `s` 的每個字元都要能「一對一」替換成 `t` 對應位置的字元，且順序要保留
- 換句話說：`s → t` 要是一個映射，`t → s` 也要是一個映射（雙向都不能有一個字元對到兩個不同字元）

## 更早的想法：用 Set 大小比對（有反例，被推翻）
最早想到的做法是比較 `new Set(s).size === new Set(t).size`——也就是「兩邊不重複字元的數量要一樣多」。這是同構的**必要條件**，但不是**充分條件**，會有反例。

反例就是測試案例裡的 `bbbaaaba` / `aaabbbba`：
```
s: b b b a a a b a
t: a a a b b b b a
```
- `s` 的不重複字元數：`{b, a}` → 2 個；`t` 的不重複字元數：`{a, b}` → 2 個，數量相同
- 但實際映射會矛盾：位置 0~2 是 `b→a`，位置 3~5 是 `a→b`，看起來是一組乾淨的雙向映射；可是位置 6 卻是 `b→b`（同一個 `b` 之前對到 `a`，這裡卻對到自己），位置 7 是 `a→a`（同一個 `a` 之前對到 `b`，這裡卻對到自己）——同一個來源字元對到了兩個不同的目標字元，違反同構定義
- Set size 這種「只看整體有幾種不重複字元」的做法完全看不到位置對位置的映射矛盾，所以會誤判成 true

所以只比較 Set 大小會漏掉「數量對、但排列對應關係錯」的情況，之後才改成記錄位置/映射關係的做法，也就是 basic.ts 這個版本。這個反例後來直接被留在測試案例裡（`console.assert(isIsomorphic('bbbaaaba', 'aaabbbba') === false)`），確保之後的版本都不會再犯同樣的錯。

## naive.ts - 最直覺的寫法
**做法**：不用任何額外資料結構，直接照題目定義的字面意思寫：任兩個位置 `i`、`j`，`s[i] === s[j]` 這件事必須跟 `t[i] === t[j]` 完全一致，所以雙層迴圈把所有位置兩兩比對一次。

```ts
for (let i = 0; i < s.length; i++) {
  for (let j = 0; j < s.length; j++) {
    if ((s[i] === s[j]) !== (t[i] === t[j])) return false;
  }
}
```

**特色**：完全不需要想到 Map／pattern 這類技巧，是「看到題目就能馬上寫出來」的版本，但代價是 O(n²) 時間、沒有用任何空間換速度。

## basic.ts - `isIsomorphic`
**做法**：分別用 `Map<string, number[]>` 記錄 `s`、`t` 每個字元「出現過的所有 index」，再逐位比對 `s[i]` 的 index 陣列跟 `t[i]` 的 index 陣列是否完全相同。

**正確性**：邏輯是對的——兩個字元若真的互相對應，它們出現的位置序列必然相同；但這是用很間接的方式表達「雙向一一映射」這個條件。比起 naive.ts 的逐對比較，basic.ts 已經想到「同構 ⇔ 位置序列相同」這個等價命題，算是往前想了一步，只是實作上沒有把這個想法優化到位。

**可以改進的地方**：
1. **效率不佳**：對每個 `i` 都要重新走一次該字元完整的 index 陣列（`for (let j = 0; j < sIndexList.length; j++)`），同一個字元出現越多次，重複比對的次數就越多，最壞情況（例如整條字串都是同一字元）會退化到 O(n²)，而不是 O(n)。
2. **多做了一次迴圈**：先建表再比對，等於整條字串多掃了一次；其實可以邊掃邊判斷，看到映射矛盾就立刻 `return false`，不用等建完表再比。
3. **儲存的資訊比需要的多**：只是要確認「字元 A 是否恆對應字元 B」，並不需要記住所有出現的 index，只要記住「上一次看到的對應關係」就足夠判斷矛盾。

## improved.ts - 修正版
直接把題意翻譯成程式碼：用兩個 `Map<string, string>` 分別記錄 `s→t` 與 `t→s` 目前為止的映射關係，邊掃邊檢查兩個方向是否都自洽。

```ts
function isIsomorphic(s: string, t: string): boolean {
  const sToT = new Map<string, string>();
  const tToS = new Map<string, string>();

  for (let i = 0; i < s.length; i++) {
    const sc = s[i];
    const tc = t[i];

    if (sToT.has(sc) && sToT.get(sc) !== tc) return false;
    if (tToS.has(tc) && tToS.get(tc) !== sc) return false;

    sToT.set(sc, tc);
    tToS.set(tc, sc);
  }

  return true;
}
```

差異：
- 只掃一次字串，時間複雜度從 basic.ts 最壞情況的 O(n²) 降到 O(n)
- 空間複雜度 O(1)（受限於字元集大小，跟 basic.ts 同量級，但不用存整條 index 陣列）
- 判斷矛盾時立即 `return false`，不用先建完整表才比對
- 邏輯直接對應題目定義（雙向、一一映射），可讀性也比對 index 陣列的做法直觀

三版都通過相同測試案例（`egg`/`add`、`f11`/`b23`、`paper`/`title`、空字串、`bbbaaaba`/`aaabbbba`）。

## 三版比較

| 版本 | 想法 | 時間複雜度 | 空間複雜度 |
| --- | --- | --- | --- |
| naive.ts | 字面翻譯題目定義，兩兩比對 | O(n²) | O(1) |
| basic.ts | 想到「同構 ⇔ 位置序列相同」，但存了整條 index 陣列又重複比對 | 最壞情況 O(n²) | O(n) |
| improved.ts | 直接維護雙向映射，邊掃邊判斷矛盾 | O(n) | O(1)（受限於字元集） |

naive.ts 和 basic.ts 剛好是同一種「有想法但沒優化」的兩個階段：naive.ts 完全沒繞路，basic.ts 繞了一個彎（想到 pattern 的等價命題）卻沒把它寫精簡，反而多存了不必要的資訊、多跑了一次迴圈，複雜度沒有因此變好，這也是為什麼 `improved.ts` 直接跳回題目定義本身（雙向映射）才是最終最合適的寫法。
