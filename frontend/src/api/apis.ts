import DefaultAxiosService from "@/service/DefaultAxiosService";
import {
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

interface UseFetchProps {
  params?: object;
  url: string;
  fn: () => void;
  options?: UseQueryOptions;
}

interface GetFetchProps {
  url: string;
  params?: object;
}

interface ResponseDataType {
  data: string | undefined | object;
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
  options,
}: UseFetchProps): UseQueryResult<ResponseDataType> => {
  return useQuery({
    queryKey: [url],
    queryFn: fn,
    options,
  });
};

export const usePost = (
  url: string,
  params?: object,
  options?: UseMutationOptions
) => {
  useMutation({
    mutationFn: () => {
      return DefaultAxiosService.instance.post(url, { params });
    },
  });
};
