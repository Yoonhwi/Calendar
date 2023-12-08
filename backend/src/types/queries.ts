import { Pool } from "mysql2/promise";
import { DataResponse } from "./response";

export type QueriesFunction = (conn: Pool) => Promise<DataResponse>;

export type QueriesFunctionWithBody<T> = (
  conn: Pool,
  body: T
) => Promise<DataResponse>;
