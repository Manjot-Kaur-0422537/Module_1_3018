import request from "supertest";
import app from "../src/app";

describe("Health Check Endpoint", () => {
  describe("GET /health", () => {
    it("should return 200 and status OK", async () => {
      // Arrange
      const endpoint = "/health";

      // Act
      const res = await request(app).get(endpoint);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status", "OK");
    });

    it("should include uptime as a number", async () => {
      // Arrange
      const endpoint = "/health";

      // Act
      const res = await request(app).get(endpoint);

      // Assert
      expect(res.body).toHaveProperty("uptime");
      expect(typeof res.body.uptime).toBe("number");
    });

    it("should include a valid timestamp", async () => {
      // Arrange
      const endpoint = "/health";

      // Act
      const res = await request(app).get(endpoint);

      // Assert
      expect(res.body).toHaveProperty("timestamp");
      expect(new Date(res.body.timestamp).toString()).not.toBe("Invalid Date");
    });

    it("should include the correct version", async () => {
      // Arrange
      const endpoint = "/health";

      // Act
      const res = await request(app).get(endpoint);

      // Assert
      expect(res.body).toHaveProperty("version", "1.0.0");
    });
  });
});
