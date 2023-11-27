import crypto from "crypto";
export const encodePw = (password: string): string => {
  const baseCrypto = crypto
    .createHash(`sha256`)
    .update(password)
    .digest(`base64`);

  return baseCrypto;
};
