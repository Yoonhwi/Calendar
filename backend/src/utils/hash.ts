import crypto from "crypto";

interface EncodeProps {
  pw: string;
  salt?: string;
}

export const encode = ({ pw, salt }: EncodeProps) => {
  const hash = crypto.createHash("sha256");
  if (salt) {
    hash.update(pw + salt);
  } else {
    hash.update(pw);
  }
  return hash.digest("base64");
};
