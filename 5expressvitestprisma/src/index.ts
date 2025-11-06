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

  // Adding Database
  await prismaClient.request.create({
    data: {
      a,
      b,
      result,
      type: "SUM",
    },
  });

  res.status(200).json({ result });
});
