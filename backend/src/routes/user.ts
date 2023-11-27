import { Express } from "express";
import { Pool } from "mysql2/promise";
import { CreateUserProps, createUser } from "../queries/user";
import { RequestWithBody } from "../types/request";

export const userRoutes = (app: Express, conn: Pool) => {
  app.post("/user", async (req: RequestWithBody<CreateUserProps>, res) => {
    const response = await createUser(conn, req.body);
    res.status(response.code).json(response);
  });
};