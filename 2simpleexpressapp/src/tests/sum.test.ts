import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { app } from "../index";

/*
supertest: A library for testing Node.js HTTP servers. It provides a high-level abstraction for sending HTTP requests and asserting responses.

Why use supertest instead of axios or fetch?

1. Integration with Testing Frameworks: Supertest is designed to work seamlessly with testing frameworks like Jest and Mocha, making it easier to write and organize tests for your HTTP servers.
2. Simplicity: Supertest provides a simple and intuitive API for sending HTTP requests and asserting responses, making it easy to test your server's behavior.
3. Flexibility: Supertest allows you to test different HTTP methods (GET, POST, PUT, DELETE) and handle different response statuses (200, 404, 500).
*/

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
  it("should return 411 for numbers bigger than 100,000", async () => {
    const response = await request(app).post("/sum").send({ a: 100001, b: 2 });
    expect(response.status).toBe(411);
    expect(response.body.error).toBe(
      "Sorry, we don't support numbers bigger than 100,000"
    );
  });
});
