import request from "supertest";
import app from "../src/app";

describe("Health Check Endpoint", () => {
  it("should return 200 and status OK", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "OK");
  });

  it("should include uptime as a number", async () => {
    const res = await request(app).get("/health");
    expect(res.body).toHaveProperty("uptime");
    expect(typeof res.body.uptime).toBe("number");
  });

  it("should include a valid timestamp and version", async () => {
    const res = await request(app).get("/health");
    expect(res.body).toHaveProperty("timestamp");
    expect(new Date(res.body.timestamp).toString()).not.toBe("Invalid Date");

    expect(res.body).toHaveProperty("version", "1.0.0");
  });
});
