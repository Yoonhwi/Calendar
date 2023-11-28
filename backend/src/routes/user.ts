import { Express } from "express";
import { Pool } from "mysql2/promise";
import { CreateUserProps, createUser, login } from "../queries/user";
import { RequestWithBody } from "../types/request";
import { isIncludeUndefined } from "../utils/request";

export const userRoutes = (app: Express, conn: Pool) => {
  app.post("/user", async (req: RequestWithBody<CreateUserProps>, res) => {
    console.log(req.body);
    if (!req.body || isIncludeUndefined(req.body)) return;
    const response = await createUser(conn, req.body);
    res.status(response.code).json(response);
  });

  app.get("/user/login", async (req, res) => {
    if (!req.body || isIncludeUndefined(req.query)) return;
    const { email, password } = req.query;
    const response = await login(conn, { email, password });
    if (response.data === "login success") {
      res.status(200).json(response);
    }
  });
};
