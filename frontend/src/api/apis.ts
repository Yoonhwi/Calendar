import DefaultAxiosService from "@/service/DefaultAxiosService";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface UseFetchProps {
  params?: object;
  url: string;
  fn: () => void;
}

interface GetFetchProps {
  url: string;
  params?: object;
}

interface ResponseDataType {
  data: string | undefined;
  message: string;
}

export const getFetch = ({ url, params }: GetFetchProps) => {
  return DefaultAxiosService.instance
    .get(url, {
      params,
    })
    .then((res) => res.data);
};

export const useGetWithParams = ({ url, fn, params }: UseFetchProps) => {
  return useQuery({
    queryKey: [url, params],
    queryFn: fn,
    enabled: false,
  });
};

export const useGet = ({
  url,
  fn,
}: UseFetchProps): UseQueryResult<ResponseDataType> => {
  return useQuery({
    queryKey: [url],
    queryFn: fn,
    staleTime: 1000 * 10,
    retry: 1,
  });
};
