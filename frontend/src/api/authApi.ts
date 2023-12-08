import axios from "axios";

export const authApi = (token: string) => {
  const authAxios = axios.create({
    baseURL: `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
    withCredentials: true,
    headers: {
      Authorization: token,
    },
  });
  authAxios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.status === 401) {
        //토큰만료처리
      }
    }
  );
};
