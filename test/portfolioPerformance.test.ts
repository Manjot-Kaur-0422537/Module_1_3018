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
