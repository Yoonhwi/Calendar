import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./core/db";

dotenv.config();

const PORT = 8000;

connectDB((pool) => {
  console.log("DB Connected");
  const app = express();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
