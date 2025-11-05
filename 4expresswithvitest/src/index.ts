import express from "express";
import { z } from "zod";

export const app = express(); // Exporting app for testing purposes
app.use(express.json());

const sumInputSchema = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", (req, res) => {
  const parseResult = sumInputSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(411).json({
      message: "Incorrect inputs provided",
    });
  }

  const { a, b } = parseResult.data;
  const result = a + b;
  res.status(200).json({ result });
});
