import express from "express";

export const app = express();
app.use(express.json());

app.post("/sum", (req, res) => {
  const { a, b } = req.body;

  // Add a constraint to check the bigniness of a and b
  if (a > 100000 || b > 100000) {
    return res
      .status(411)
      .json({ error: "Sorry, we don't support numbers bigger than 100,000" });
  }

  const result = a + b;
  res.status(200).json({ result });
});
