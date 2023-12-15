import { ApiRoutes } from "@/constants/routes";
import axios, { AxiosRequestConfig } from "axios";
//현재 겪고있는 문제
//새로고침시 header에 저장해둔 accesstoken이 사라지기때문에
//token으로 get요청을 보낼때, 에러401이 반환되면 refreshtoken을 확인후
//새로운 accesstoken을 발급받아 header에 저장함.
//accesstoken을 발급받는 api는 저장x.
//accesstoken이 필요했던 마지막요청을 다시 보내기위해
//마지막요청을 저장해둠.
//해당 과정에서 문제가 발생.
//달력모드와 달력+todo모드라고 부르겠음.
//달력모드에서 새로고침후 날짜를 클릭해 달력+todo모드로 전환시
//해당유저에대한 todo리스트를 가져오는 api를 호출함.
//하지만 해당 api는 accesstoken이 필요한 api이기때문에
//token url로 get요청을 하게되고 에러 401이 반환되므로 마지막요청이 token url get요청이됨.
//token url get요청후 원래의 todo리스트를 가져오는 api를 호출해야함.
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
  //요청전 url이 access token이 아니고 마지막 요청이 없으면 마지막요청으로 저장
  (config) => {
    if (
      config.url !== ApiRoutes.AccessToken &&
      !DefaultAxiosService.lastRequest
    ) {
      DefaultAxiosService.lastRequest = config;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

DefaultAxiosService.instance.interceptors.response.use(
  (response) => {
    console.log("URl", DefaultAxiosService.lastRequest);
    console.log("response", response.config.url);
    if (response.config.url !== ApiRoutes.AccessToken) {
      DefaultAxiosService.lastRequest = null;
    }
    //응답이 성공적이면 마지막요청을 초기화.
    return response;
  },
  (error) => {
    console.log("URl", DefaultAxiosService.lastRequest);
    if (error.response.status === 401) {
      console.log("status:401", error.response);
      //refresh token
      DefaultAxiosService.instance
        .get(ApiRoutes.AccessToken)
        .then((res) => {
          console.log(res.data.data);
          DefaultAxiosService.addHeaderToken(res.data.data);
        })
        .then(() => {
          if (DefaultAxiosService.lastRequest) {
            console.log("URL", DefaultAxiosService.lastRequest);
            const lastRequest = DefaultAxiosService.lastRequest;
            DefaultAxiosService.lastRequest = null;
            return DefaultAxiosService.instance(lastRequest);
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
