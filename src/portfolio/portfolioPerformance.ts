// Define the output interface
export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

// Fixed function
export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformance {
  const profitOrLoss = currentValue - initialInvestment;
  const percentageChange = (profitOrLoss / initialInvestment) * 100;

  const performanceSummary =
    percentageChange > 20
      ? "Portfolio gained significantly."
      : percentageChange > 10
      ? "Portfolio gained moderately."
      : percentageChange > 0.1
      ? "Portfolio gained slightly."
      : percentageChange === 0
      ? "No change."
      : percentageChange >= -10
      ? "Portfolio lost slightly."
      : percentageChange >= -20
      ? "Portfolio lost moderately."
      : "Portfolio lost significantly.";

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary,
  };
}
