import { Express } from "express";
import { Pool } from "mysql2/promise";
import { RequestWithBody } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { returnBadRequest } from "../utils/response";
import { postTodoList } from "../queries/todo";
export interface PostTodoListProps {
  text: string;
  date: string;
  writer: string;
}

export const todoRoutes = (app: Express, conn: Pool) => {
  app.post("/todo", async (req: RequestWithBody<PostTodoListProps>, res) => {
    if (!req.body || isIncludeUndefined(req.body)) return returnBadRequest(res);
    const response = await postTodoList(conn, req.body);
    res.status(response.code).json(response);
  });

  app.get(
    "/todo/html",
    async (req: RequestWithBody<PostTodoListProps>, res) => {
      res.status(200).send(
        `
        <div>안녕하세요. 투두리스트입니다.</div>
        <div>입력하신 내용은 ${req.body.text} 입니다.</div>
      `
      );
    }
  );
};
