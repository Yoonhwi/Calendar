import { Express } from "express";
import { Pool } from "mysql2/promise";
import { CreateUserProps, createUser, login } from "../queries/user";
import { RequestWithBody } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { getAccessToken, getRefreshToken } from "../utils/jwt";
import { returnBadRequest } from "../utils/response";

export const userRoutes = (app: Express, conn: Pool) => {
  app.post("/user", async (req: RequestWithBody<CreateUserProps>, res) => {
    console.log("userRoutes:", req.body);
    if (!req.body || isIncludeUndefined(req.body)) return returnBadRequest(res);
    const response = await createUser(conn, req.body);
    return res.status(response.code).json(response);
  });

  app.get("/user/login", async (req, res) => {
    console.log("login:", req.body);
    if (!req.body || isIncludeUndefined(req.query))
      return returnBadRequest(res);
    const { email, password } = req.query;
    const response = await login(conn, { email, password });
    const emailAsString = String(email);
    switch (response.data.message) {
      case "login success":
        const accessToken = getAccessToken(emailAsString, response.data.id);
        const refreshToken = getRefreshToken(emailAsString, response.data.id);
        res.cookie("accessToken", accessToken, {
          secure: false, //나중에 https 로 바꾸게되면 true로 수정
          httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
        });
        return res.status(200).json(response.data.message);
      case "not match": //비밀번호가 틀렸을 때
        return res.status(401).json(response.data.message);
      case "none email": //이메일이 없을 때
        return res.status(401).json(response.data.message);
    }
  });

  app.get("/logout", async (req, res) => {
    console.log("logout");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "logout success" });
  });
};
