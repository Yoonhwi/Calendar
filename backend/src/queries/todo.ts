import { Pool } from "mysql2/promise";
import {
  PostTodoListProps,
  GetTodoListProps,
  GetCountpageProps,
  DeleteTodoListProps,
  UpdateTodoListProps,
} from "../routes/todo";
import { QueriesFunctionWithBody } from "../types/queries";
import { makeSuccessResponse } from "../utils/response";
import { DB_QUERY_ERROR } from "../constants/reponse";

const LIMIT = 6;

export const getTodoList: QueriesFunctionWithBody<GetTodoListProps> = async (
  conn,
  props
) => {
  const { page, writer, date } = props;
  const offset = (page - 1) * LIMIT;
  try {
    const result = await conn.execute(
      `SELECT * FROM todolist WHERE writer = ${writer} AND date = "${date}" ORDER BY id DESC LIMIT ${LIMIT} OFFSET ${offset}`
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};

export const postTodoList: QueriesFunctionWithBody<PostTodoListProps> = async (
  conn,
  props
) => {
  const { text, date, writer } = props.params;
  try {
    const result = await conn.execute(
      "INSERT INTO todolist (text, date, writer) VALUES (?,?,?)",
      [text, date, writer]
    );
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};

export const getCountPage: QueriesFunctionWithBody<GetCountpageProps> = async (
  conn,
  props
) => {
  const { writer, date } = props;
  console.log(writer, date);
  try {
    const result = await conn.execute(
      `SELECT COUNT(*) as count FROM todolist WHERE writer = ${writer} AND date = "${date}"`
    );
    return makeSuccessResponse(result[0]);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};

export const deleteTodoList: QueriesFunctionWithBody<
  DeleteTodoListProps
> = async (conn, props) => {
  const { id } = props;
  try {
    const result = await conn.execute(`DELETE FROM todolist WHERE id = ${id}`);
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};

export const updateTodoList: QueriesFunctionWithBody<
  UpdateTodoListProps
> = async (conn, props) => {
  const { id, text } = props;
  try {
    const result = await conn.execute(
      `UPDATE todolist SET text = "${text}" WHERE id = ${id}`
    );
    return makeSuccessResponse(result);
  } catch (err) {
    console.log(err);
    return DB_QUERY_ERROR;
  }
};
