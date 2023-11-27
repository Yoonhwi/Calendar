import { QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { createSalt } from "../utils/salt";

export interface CreateUserProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  login_type: number;
}

export const createUser: QueriesFunctionWithBody<CreateUserProps> = async (
  conn,
  params
) => {
  const { name, email, phone, password, login_type } = params;
  const salt = await createSalt();
  const result = await conn.execute(
    "INSERT INTO user (name,phone_number,login_id,password,login_type,salt) VALUES (?,?,?,?,?,?)",
    [name, phone, email, password, login_type, salt]
  );
  return makeSuccessResponse("회원가입 성공");
};
