import { assetAllocationPercentages, Asset } from "../src/portfolio/portfolioPerformance";

describe("assetAllocationPercentages", () => {
  test("calculates percentages evenly", () => {
    const assets: Asset[] = [
      { name: "Stocks", type: "Equity", value: 5000 },
      { name: "Bonds", type: "Debt", value: 5000 },
    ];
    const result = assetAllocationPercentages(assets);
    expect(result).toEqual([
      { name: "Stocks", percentage: 50 },
      { name: "Bonds", percentage: 50 },
    ]);
  });

  test("calculates uneven percentages", () => {
    const assets: Asset[] = [
      { name: "Stocks", type: "Equity", value: 7000 },
      { name: "Bonds", type: "Debt", value: 3000 },
    ];
    const result = assetAllocationPercentages(assets);
    expect(result).toEqual([
      { name: "Stocks", percentage: 70 },
      { name: "Bonds", percentage: 30 },
    ]);
  });

  test("returns empty array for no assets", () => {
    expect(assetAllocationPercentages([])).toEqual([]);
  });
});
