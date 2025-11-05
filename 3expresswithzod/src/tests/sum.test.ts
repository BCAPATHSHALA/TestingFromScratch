import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { app } from "../index";

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    const response = await request(app).post("/sum").send({ a: 1, b: 2 });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(3);
  });
  it("should handle negative numbers", async () => {
    const response = await request(app).post("/sum").send({ a: -1, b: -2 });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(-3);
  });
  it("should return the sum of two zero numbers", async () => {
    const response = await request(app).post("/sum").send({ a: 0, b: 0 });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(0);
  });
  it("should return 411 for missing parameters", async () => {
    const response = await request(app).post("/sum").send({ a: 1 });
    expect(response.status).toBe(411);
    expect(response.body.message).toBe("Incorrect inputs provided");
  });
});
