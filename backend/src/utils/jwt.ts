import { HmacSHA256 } from "crypto-js";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getAccessToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY!, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  return token;
};

export const getRefreshToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY!, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return token;
};

export const decodeToken = (token: string) => {
  if (!token) return;
  const decoded = jwt.decode(token, { complete: true }) as {
    payload: JwtPayload;
  };

  const payLoad = decoded?.payload;

  const expirationTimeInSeconds = payLoad?.exp;
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  if (expirationTimeInSeconds! < currentTimeInSeconds) {
    return;
  } else {
    return payLoad;
  }
};
