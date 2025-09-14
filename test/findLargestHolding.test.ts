import { findLargestHolding, Asset } from "../src/portfolio/portfolioPerformance";

describe("findLargestHolding", () => {
  test("returns the largest holding from assets", () => {
    const assets: Asset[] = [
      { name: "Stocks", type: "Equity", value: 5000 },
      { name: "Bonds", type: "Debt", value: 3000 },
      { name: "Real Estate", type: "Property", value: 10000 },
    ];
    expect(findLargestHolding(assets)?.name).toBe("Real Estate");
  });

  test("returns null for an empty array", () => {
    expect(findLargestHolding([])).toBeNull();
  });

  test("returns the first asset if values are tied", () => {
    const assets: Asset[] = [
      { name: "Stocks", type: "Equity", value: 5000 },
      { name: "Bonds", type: "Debt", value: 5000 },
    ];
    expect(findLargestHolding(assets)?.name).toBe("Stocks");
  });
});
