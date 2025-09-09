import express from "express";

const app = express();

// Health check endpoint
app.get("/health", (req , res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),       
    timestamp: new Date().toISOString(), 
    version: "1.0.0"                
  });
});

export default app;
