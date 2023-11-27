import axios from "axios";

class DefaultAxiosService {
  static instance = axios.create({
    baseURL: `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
    withCredentials: true,
  });
}

export default DefaultAxiosService;
