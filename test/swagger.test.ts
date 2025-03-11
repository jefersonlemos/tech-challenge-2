import express from "express";
import request from "supertest";
import swaggerSetup from "../src/swagger";

let app: express.Express;

beforeAll(() => {
  app = express();
  swaggerSetup(app);
});

describe("Swagger Setup", () => {
  it("should serve Swagger UI on /api-docs", async () => {
    const response = await request(app).get("/api-docs").redirects(1);
    expect(response.status).toBe(200);
    expect(response.text).toContain("Swagger UI");
  });
});
