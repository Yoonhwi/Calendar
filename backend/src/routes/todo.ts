import { Express } from "express";
import { Pool } from "mysql2/promise";
import { RequestWithBody } from "../types/request";
import { isIncludeUndefined } from "../utils/request";
import { returnBadRequest } from "../utils/response";
import {
  deleteTodoList,
  getCountPage,
  getTodoList,
  postTodoList,
  updateIsDone,
  updateTodoList,
} from "../queries/todo";

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

export interface DeleteTodoListProps {
  id: number;
}

export interface UpdateTodoListProps {
  id: number;
  text?: string;
  isDone?: boolean;
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

  app.delete("/todo/:id", async (req, res) => {
    if (!req.params) return returnBadRequest(res);
    const { id } = req.params;
    const response = await deleteTodoList(conn, { id: Number(id) });
    return res.status(response.code).json(response.message);
  });

  app.put(
    "/todo/:id",
    async (req: RequestWithBody<UpdateTodoListProps>, res) => {
      if (!req.params || !req.body) return returnBadRequest(res);
      const { id } = req.params;

      if (req.body.text) {
        console.log("text수정");
        //req.body에 text가 있다면,해당코드
        console.log("req.body", req.body);
        console.log("id", id);

        const response = await updateTodoList(conn, {
          id: Number(id),
          text: req.body.text,
        });
        return res.status(response.code).json(response.message);
      }
      if (req.body.isDone != undefined) {
        console.log(req.body);
        console.log(id);
        const response = await updateIsDone(conn, {
          id: Number(id),
          isDone: req.body.isDone,
        });
        return res.status(response.code).json(response.message);
      }
    }
  );
};
