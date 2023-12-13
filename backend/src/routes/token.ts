import { Express } from "express";
import { Pool } from "mysql2/promise";
import { decodeToken } from "../utils/jwt";

export const tokenRoutes = (app: Express, conn: Pool) => {
  app.get("/token", (req, res) => {
    const accessToken = req.headers.authorization;
    if (!accessToken || accessToken === "") {
      return res.status(401).json({ message: "None AccessToken" });
    }
    const decodedToken = decodeToken(accessToken);
    if (!decodedToken)
      return res.status(401).json({ message: "Expired Token" });
    return res.status(200).json({ message: "Success", data: decodedToken });
  });
};
