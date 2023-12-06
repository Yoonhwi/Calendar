import { Pool } from "mysql2/promise";
import { PostTodoListProps } from "../routes/todo";
import { QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { DB_QUERY_ERROR } from "../constants/reponse";

export const postTodoList: QueriesFunctionWithBody<PostTodoListProps> = async (
  conn,
  props
) => {
  const { text, date, writer } = props;
  try {
    const result = await conn.execute(
      "INSERT INTO todo_list (text, data, writer) VALUES (?,?,?)",
      [text, date, writer]
    );
    return makeSuccessResponse(result);
  } catch {
    return DB_QUERY_ERROR;
  }
};
