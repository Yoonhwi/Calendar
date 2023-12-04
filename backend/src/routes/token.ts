import { Express } from "express";
import { Pool } from "mysql2/promise";
import { decodeToken } from "../utils/jwt";
export const tokenRoutes = (app: Express, conn: Pool) => {
  app.get("/token", (req, res) => {
    const { accessToken } = req.cookies;
    console.log(accessToken);
    if (!accessToken || accessToken === " ") {
      return res.status(400).json({ message: "None AccessToken" });
    }
    const decodedToken = decodeToken(accessToken);
    if (!decodedToken)
      return res.status(401).json({ message: "Expired Token" });
    return res.status(200).json({ message: "Success", data: decodedToken }); //여기서 data가 access토큰이아닌 디코딩된 유저정보를 줌
  });
};
