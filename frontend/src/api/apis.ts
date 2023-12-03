import DefaultAxiosService from "@/service/DefaultAxiosService";
import { useQuery } from "@tanstack/react-query";

interface UseFetchProps {
  params?: object;
  url: string;
  fn: () => void;
}

interface GetFetchProps {
  url: string;
  params?: object;
}

export const getFetch = ({ url, params }: GetFetchProps) => {
  return DefaultAxiosService.instance.get(url, {
    params,
  });
};

export const useGetWithParams = ({ url, fn, params }: UseFetchProps) => {
  return useQuery({
    queryKey: [url, params],
    queryFn: fn,
    enabled: false,
  });
};

export const useGet = ({ url, fn }: UseFetchProps) => {
  return useQuery({
    queryKey: [url],
    queryFn: fn,
    enabled: false,
  });
};
