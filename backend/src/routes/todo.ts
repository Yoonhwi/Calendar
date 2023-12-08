import { Express } from "express";
import { Pool } from "mysql2/promise";
import { RequestWithBody } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { returnBadRequest } from "../utils/response";
import { postTodoList } from "../queries/todo";

export interface PostTodoListProps {
  params: {
    text: string;
    date: string;
    writer: string;
  };
}

export const todoRoutes = (app: Express, conn: Pool) => {
  app.post("/todo", async (req: RequestWithBody<PostTodoListProps>, res) => {
    if (!req.body.params || isIncludeUndefined(req.body.params))
      return returnBadRequest(res);
    const response = await postTodoList(conn, req.body);
    res.status(response.code).json(response);
  });
};
