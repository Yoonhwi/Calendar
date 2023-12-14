import { Express } from "express";
import { Pool } from "mysql2/promise";
import { decodeToken, getAccessToken } from "../utils/jwt";

export const tokenRoutes = (app: Express, conn: Pool) => {
  app.get("/token", (req, res) => {
    const accessToken = req.headers.authorization;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken || accessToken === "") {
      return res.status(401).json({ message: "None AccessToken" });
    }
    const decodedToken = decodeToken(accessToken);

    if (!decodedToken)
      return res.status(401).json({ message: "Expired Token" });
    return res.status(200).json({ message: "Success", data: decodedToken });
  });
  app.get("/accesstoken", (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "None RefreshToken" });
    const decodedToken = decodeToken(refreshToken);
    if (!decodedToken)
      return res.status(401).json({ message: "Expired RefreshToken" });
    const accessToken = getAccessToken(decodedToken.email, decodedToken.id);
    return res.status(200).json({ message: "Success", data: accessToken });
  });
};
