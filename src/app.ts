import express, { Request, Response } from "express";

import { 
  calculatePortfolioPerformance, 
  findLargestHolding, 
  assetAllocationPercentages, 
  Asset 
} from "./portfolio/portfolioPerformance";

const app = express();
app.use(express.json()); // needed for parsing JSON request bodies

// Health check endpoint
app.get("/health", (req: Request, res: Response): void => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Portfolio performance endpoint
// Example: /api/v1/portfolio/performance?initialInvestment=10000&currentValue=12000
app.get("/api/v1/portfolio/performance", (req: Request, res: Response): void => {
  const { initialInvestment, currentValue } = req.query;

  if (!initialInvestment || !currentValue) {
    res.status(400).json({ error: "Missing query parameters" });
    return;
  }

  const performance = calculatePortfolioPerformance(
    Number(initialInvestment),
    Number(currentValue)
  );

  res.json(performance);
});

// Largest holding endpoint
// Expects body: { "assets": [ { "name": "House", "type": "real estate", "value": 300000 }, ... ] }
app.post(
  "/api/v1/portfolio/largest-holding",
  (req: Request<{}, {}, { assets: Asset[] }>, res: Response): void => {
    const { assets } = req.body;

    if (!assets || assets.length === 0) {
      res.status(400).json({ error: "Assets are required" });
      return;
    }

    const largest = findLargestHolding(assets);
    res.json(largest);
  }
);

// Asset allocation endpoint
// Expects body: { "assets": [ { "name": "Stocks", "type": "stock", "value": 5000 }, ... ] }
app.post(
  "/api/v1/portfolio/allocation",
  (req: Request<{}, {}, { assets: Asset[] }>, res: Response): void => {
    const { assets } = req.body;

    if (!assets || assets.length === 0) {
      res.status(400).json({ error: "Assets are required" });
      return;
    }

    const allocation = assetAllocationPercentages(assets);
    res.json(allocation);
  }
);

export default app;
