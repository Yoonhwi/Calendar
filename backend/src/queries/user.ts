import { RowDataPacket } from "mysql2";
import { QueriesFunctionWithBody } from "../types/queries";
import { encode } from "../utils/hash";
import { makeSuccessResponse } from "../utils/response";
import { createSalt } from "../utils/salt";
import { DB_QUERY_ERROR } from "../constants/reponse";

export interface CreateUserProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  login_type: number;
}

export interface LoginProps {
  email: any;
  password: any;
}

export const createUser: QueriesFunctionWithBody<CreateUserProps> = async (
  conn,
  params
) => {
  try {
    let { name, email, phone, password, login_type } = params;
    const salt = await createSalt();

    password = encode({ pw: password, salt });

    await conn.execute(
      "INSERT INTO user (name,phone_number,login_id,login_password,login_type,salt) VALUES (?,?,?,?,?,?)",
      [name, phone, email, password, login_type, salt]
    );
    return makeSuccessResponse("회원가입 성공");
  } catch {
    return DB_QUERY_ERROR;
  }
};

export const login: QueriesFunctionWithBody<LoginProps> = async (
  conn,
  params
) => {
  const { email, password } = params;
  try {
    const getSalt = await conn.execute(
      "SELECT salt,login_password,id FROM user WHERE login_id = ?",
      [email]
    );

    if ((getSalt[0] as RowDataPacket[]).length) {
      const { salt, login_password, id } = (getSalt[0] as RowDataPacket[])[0];
      const encodedPassword = encode({ pw: password, salt });

      if (login_password === encodedPassword) {
        return makeSuccessResponse({ message: "login success", id });
      } else {
        return makeSuccessResponse({ message: "not match" });
      }
    } else {
      return makeSuccessResponse({ message: "none email" });
    }
  } catch {
    return DB_QUERY_ERROR;
  }
};
