import axios from "axios";

class DefaultAxiosService {
  static instance = axios.create({
    baseURL: `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
    withCredentials: true,
  });
  static addHeaderToken(token: string): void {
    this.instance.defaults.headers.common.Authorization = token;
  }
}

export default DefaultAxiosService;
