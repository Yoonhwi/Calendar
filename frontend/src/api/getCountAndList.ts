import { QueryObserverResult } from "@tanstack/react-query";
import React from "react";

export const getCountAndList = (
  fn1: () => Promise<QueryObserverResult<any, Error>>,
  fn2: () => Promise<QueryObserverResult<any, Error>>,
  set: React.Dispatch<React.SetStateAction<any>>
) => {
  fn1()
    .then((res) => set(res?.data))
    .then(() => fn2());
};
