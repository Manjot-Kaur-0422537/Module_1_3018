import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

describe("calculatePortfolioPerformance", () => {
  it("should calculate profit correctly (currentValue > initialInvestment)", () => {
    const result = calculatePortfolioPerformance(10000, 12000);
    expect(result.profitOrLoss).toBe(2000);
    expect(result.percentageChange).toBe(20);
    expect(result.performanceSummary).toContain("gained moderately");
  });

  it("should calculate loss correctly (currentValue < initialInvestment)", () => {
    const result = calculatePortfolioPerformance(10000, 8000);
    expect(result.profitOrLoss).toBe(-2000);
    expect(result.percentageChange).toBe(-20);
    expect(result.performanceSummary).toContain("lost moderately");
  });

  it("should handle no change (currentValue = initialInvestment)", () => {
    const result = calculatePortfolioPerformance(10000, 10000);
    expect(result.profitOrLoss).toBe(0);
    expect(result.percentageChange).toBe(0);
    expect(result.performanceSummary).toBe("No change.");
  });

  it("should handle significant gain (> 20%)", () => {
    const result = calculatePortfolioPerformance(10000, 13000);
    expect(result.performanceSummary).toContain("gained significantly");
  });
});

// tests/findLargestHolding.test.ts
import { findLargestHolding, Asset } from "../src/portfolio/portfolioPerformance";

describe("findLargestHolding", () => {
  it("should return the asset with the highest value", () => {
    const assets: Asset[] = [
      { name: "House", type: "real estate", value: 300000 },
      { name: "Stocks", type: "stock", value: 50000 },
      { name: "Bonds", type: "bond", value: 10000 },
    ];
    expect(findLargestHolding(assets)?.name).toBe("House");
  });

  it("should return null if the array is empty", () => {
    expect(findLargestHolding([])).toBeNull();
  });

  it("should return the first asset if multiple assets have the same highest value", () => {
    const assets: Asset[] = [
      { name: "A", type: "stock", value: 100 },
      { name: "B", type: "bond", value: 100 },
    ];
    expect(findLargestHolding(assets)?.name).toBe("A");
  });
});

// tests/assetAllocationPercentages.test.ts
import { assetAllocationPercentages} from "../src/portfolio/portfolioPerformance";

describe("assetAllocationPercentages", () => {
  it("should calculate percentages correctly for even distribution", () => {
    const assets: Asset[] = [
      { name: "Stocks", type: "stock", value: 5000 },
      { name: "Bonds", type: "bond", value: 5000 },
    ];
    expect(assetAllocationPercentages(assets)).toEqual([
      { name: "Stocks", percentage: 50 },
      { name: "Bonds", percentage: 50 },
    ]);
  });

  it("should calculate percentages correctly for uneven distribution", () => {
    const assets: Asset[] = [
      { name: "Stocks", type: "stock", value: 7000 },
      { name: "Bonds", type: "bond", value: 3000 },
    ];
    expect(assetAllocationPercentages(assets)).toEqual([
      { name: "Stocks", percentage: 70 },
      { name: "Bonds", percentage: 30 },
    ]);
  });

  it("should return empty array if no assets are provided", () => {
    expect(assetAllocationPercentages([])).toEqual([]);
  });
});
