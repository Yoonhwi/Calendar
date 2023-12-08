import { Express } from "express";
import { Pool } from "mysql2/promise";
import { RequestWithBody } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { returnBadRequest } from "../utils/response";
import { getCountPage, getTodoList, postTodoList } from "../queries/todo";

export interface PostTodoListProps {
  params: {
    text: string;
    date: string;
    writer: string;
  };
}

export interface GetTodoListProps {
  page: number;
  writer: number;
  date: string;
}

export interface GetCountpageProps {
  writer: number;
  date: string;
}

export const todoRoutes = (app: Express, conn: Pool) => {
  app.get("/todo", async (req, res) => {
    if (!req.query || isIncludeUndefined(req.query))
      return returnBadRequest(res);
    const { page, writer, date } = req.query;
    const params = {
      page: Number(page),
      writer: Number(writer),
      date: String(date),
    };
    const response = await getTodoList(conn, params);
    return res.status(response.code).json(response.data);
  });

  app.get("/todo/count", async (req, res) => {
    console.log(req.query);
    if (!req.query || isIncludeUndefined(req.query))
      return returnBadRequest(res);
    const { writer, date } = req.query;
    const params = {
      writer: Number(writer),
      date: String(date),
    };
    const response = await getCountPage(conn, params);
    return res.status(response.code).json(response.data[0].count);
  });

  app.post("/todo", async (req: RequestWithBody<PostTodoListProps>, res) => {
    if (!req.body.params || isIncludeUndefined(req.body.params))
      return returnBadRequest(res);
    const response = await postTodoList(conn, req.body);
    return res.status(response.code).json(response.message);
  });
};
