import { ApiRoutes } from "@/constants/routes";
import axios, { AxiosRequestConfig } from "axios";

class DefaultAxiosService {
  static instance = axios.create({
    baseURL: `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
    withCredentials: true,
  });
  static lastRequest: AxiosRequestConfig | null = null;
  static addHeaderToken(token: string): void {
    this.instance.defaults.headers.common.Authorization = token; //refresh token
  }
}
DefaultAxiosService.instance.interceptors.request.use(
  (config) => {
    if (config.url !== ApiRoutes.AccessToken)
      DefaultAxiosService.lastRequest = config;
    return config;
  },
  (error) => Promise.reject(error)
);

DefaultAxiosService.instance.interceptors.response.use(
  (response) => {
    console.log("URl", DefaultAxiosService.lastRequest);
    return response;
  },
  (error) => {
    console.log("URl", DefaultAxiosService.lastRequest);
    if (error.response.status === 401) {
      //refresh token
      DefaultAxiosService.instance
        .get(ApiRoutes.AccessToken)
        .then((res) => DefaultAxiosService.addHeaderToken(res.data))
        .then(() => {
          if (DefaultAxiosService.lastRequest) {
            console.log("URL", DefaultAxiosService.lastRequest);
            return DefaultAxiosService.instance(
              DefaultAxiosService.lastRequest
            );
          } else {
            console.log("마지막 api요청이 없습니다.");
          }
        })
        .catch((err) => console.log(err));
    }
    return Promise.reject(error);
  }
);

export default DefaultAxiosService;
