import { Express } from "express";
import { Pool } from "mysql2/promise";
import { CreateUserProps, createUser, login } from "../queries/user";
import { RequestWithBody } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { getAccessToken, getRefreshToken } from "../utils/jwt";

export const userRoutes = (app: Express, conn: Pool) => {
  app.post("/user", async (req: RequestWithBody<CreateUserProps>, res) => {
    console.log(req.body);
    if (!req.body || isIncludeUndefined(req.body)) return;
    const response = await createUser(conn, req.body);
    res.status(response.code).json(response);
  });

  app.get("/user/login", async (req, res) => {
    console.log(req.body);
    if (!req.body || isIncludeUndefined(req.query)) return;
    const { email, password } = req.query;
    const response = await login(conn, { email, password });
    const emailAsString = String(email);
    if (response.data === "login success") {
      const accessToken = getAccessToken(emailAsString);
      const refreshToken = getRefreshToken(emailAsString);
      res.cookie("accessToken", accessToken, {
        secure: false, //나중에 https 로 바꾸게되면 true로 수정
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
      });
      res.status(200).json(response);
    }
  });
};
