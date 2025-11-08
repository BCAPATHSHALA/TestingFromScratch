import "dotenv/config";
import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../index.js";
import resetDb from "./helpers/reset-db.js";

describe("POST /sum", () => {
  // Clear the database before each test run
  beforeAll(async () => {
    console.log("clearing db");
    await resetDb();
  });

  // Test cases go here after clearing the database
  it("should return 411 for missing parameters", async () => {
    const response = await request(app).post("/sum").send({ a: 1 });
    expect(response.status).toBe(411);
    expect(response.body.message).toBe("Incorrect inputs provided");
  });
  it("should return 411 for numbers bigger than 100,000", async () => {
    const response = await request(app).post("/sum").send({ a: 100001, b: 2 });
    expect(response.status).toBe(411);
    expect(response.body.error).toBe(
      "Sorry, we don't support numbers bigger than 100,000"
    );
  });
  it("should sum add 2 numbers", async () => {
    const response = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(3);
    expect(response.body.id).toBe(1);
  });
  it("should sum add 2 negative numbers", async () => {
    const response = await request(app).post("/sum").send({
      a: -1,
      b: -2,
    });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(-3);
    expect(response.body.id).toBe(2);
  });
});
