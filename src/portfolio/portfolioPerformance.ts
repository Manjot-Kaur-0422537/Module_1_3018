export interface Asset {
  name: string;
  type: string;
  value: number;
}

// Define the output interface
export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
  largestHolding?: Asset | null;
  allocationPercentages?: { name: string; percentage: number }[];
}

// Fixed function 1
export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number,
  assets?: Asset[] 
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

  // Largest holding
  const largestHolding = assets && assets.length > 0
    ? assets.reduce((max, asset) => (asset.value > max.value ? asset : max), assets[0])
    : null;

  // Allocation percentages
  const totalValue = assets?.reduce((sum, asset) => sum + asset.value, 0) || 0;
  const allocationPercentages = totalValue
    ? assets?.map(asset => ({
        name: asset.name,
        percentage: parseFloat(((asset.value / totalValue) * 100).toFixed(2)),
      }))
    : undefined;

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary,
    largestHolding,
    allocationPercentages,
  };
}

// Function 2: Find the Largest Holding
export function findLargestHolding(assets: Asset[]): Asset | null {
  if (!assets || assets.length === 0) return null;
  return assets.reduce((max, asset) => (asset.value > max.value ? asset : max), assets[0]);
}

// Function 3: Calculate Asset Allocation Percentages
export function assetAllocationPercentages(
  assets: Asset[]
): { name: string; percentage: number }[] {
  if (!assets || assets.length === 0) return [];

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return assets.map(asset => ({
    name: asset.name,
    percentage: parseFloat(((asset.value / totalValue) * 100).toFixed(2)),
  }));
}
