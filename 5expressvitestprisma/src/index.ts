import express from "express";
import { z } from "zod";
import { prismaClient } from "./db";
import "dotenv/config";

export const app = express();
app.use(express.json());

const sumInputSchema = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", async (req, res) => {
  const parseResult = sumInputSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(411).json({
      message: "Incorrect inputs provided",
    });
  }

  const { a, b } = parseResult.data;
  if (a > 100000 || b > 100000) {
    return res
      .status(411)
      .json({ error: "Sorry, we don't support numbers bigger than 100,000" });
  }
  const result = a + b;

  // Adding Database: we have to mock out this request creation during unit testing
  const request = await prismaClient.request.create({
    data: {
      a,
      b,
      result,
      type: "MULTIPLY", // If add "MULTIPLY" so it will fine without spy but add spy it will fail
    },
  });

  res.status(200).json({ result, id: request.id });
});
