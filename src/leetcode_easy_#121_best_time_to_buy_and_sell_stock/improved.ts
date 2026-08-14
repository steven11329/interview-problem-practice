function maxProfit(prices: number[]): number {
  let minPrice = prices[0];
  let max = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > max) {
      max = prices[i] - minPrice;
    }
  }

  return max;
};

console.assert(maxProfit([7, 1, 5, 3, 6, 4]) === 5);
console.assert(maxProfit([7, 6, 4, 3, 1]) === 0);
console.assert(maxProfit([7, 2, 6, 3, 1, 2]) === 4);
