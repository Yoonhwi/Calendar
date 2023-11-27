import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./core/db";
import mysql from "mysql2/promise";
import { userRoutes } from "./routes/user";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

export const DB_OPTIONS: mysql.PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 30,
};

const PORT = 8000;

connectDB((pool) => {
  console.log("DB Connected");
  const app = express();

  app.use(bodyParser.json());

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  userRoutes(app, pool);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
