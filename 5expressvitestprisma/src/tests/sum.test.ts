import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../index";
import { prismaClient } from "../__mocks__/db";

// Mocking Database (Without Manual Deep Mocking)
vi.mock("../db");

describe("POST /sum", () => {
  // Use mockResolvedValue to mock the return value from database
  prismaClient.request.create.mockResolvedValue({
    id: 1,
    a: 1,
    b: 2,
    result: 3,
    type: "SUM",
  });

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
  it("should return the sum of two numbers", async () => {
    const response = await request(app).post("/sum").send({ a: 1, b: 2 });
    expect(response.body.result).toBe(3);
    expect(response.body.id).toBe(1);
    expect(response.status).toBe(200);
  });
});
