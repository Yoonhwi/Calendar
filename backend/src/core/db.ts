import mysql, { Pool } from "mysql2/promise";

const DB_OPTIONS: mysql.PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 30,
};

export const connectDB = async (cb: (connection: Pool) => void) => {
  const pool = mysql.createPool(DB_OPTIONS);

  try {
    await pool.query("SELECT * from user");
    console.log("DB Connection Success: ");
    cb(pool);
  } catch (err) {
    console.log("DB Connection Error: ", err);
  }
};
