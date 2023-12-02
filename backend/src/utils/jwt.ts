import jwt from "jsonwebtoken";

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
