import request from "supertest";
import app from "../src/app";

describe("Health Check Endpoint", () => {
  it("should return server health info", async () => {
    const res = await request(app).get("/health");
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "OK");
    expect(res.body).toHaveProperty("uptime");
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body).toHaveProperty("version", "1.0.0");

    // Extra checks
    expect(typeof res.body.uptime).toBe("number");
    expect(new Date(res.body.timestamp).toString()).not.toBe("Invalid Date");
  });
});
