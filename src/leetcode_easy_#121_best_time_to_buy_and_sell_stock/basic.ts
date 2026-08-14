function maxProfit(prices: number[]): number {
  let max = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      let diff = prices[j] - prices[i];
      if (max < diff) {
        max = diff;
      }
    }
  }
  return max
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));