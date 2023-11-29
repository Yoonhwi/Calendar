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

export const useGet = ({ url, fn, params }: UseFetchProps) => {
  return useQuery({
    queryKey: [url, params],
    queryFn: fn,
    enabled: false,
  });
};
