import DefaultAxiosService from "@/service/DefaultAxiosService";
import {
  QueryFunctionContext,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

interface queryOptions {
  enabled?: boolean;
  refetchOnMount?: boolean | "always";
  refetchOnReconnect?: boolean;
  retry?: boolean;
  retryDelay?: number;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean | "always";
  onError?: (err: any) => void;
  onSuccess?: (data: any) => void;
  onSettled?: (data: any, error: any) => void;
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

export const useGetWithParams = <T extends unknown>(
  url: string,
  fn: (context: QueryFunctionContext) => Promise<T>,
  params: object,
  options?: queryOptions
) => {
  return useQuery({
    queryKey: [url, params],
    queryFn: fn,
    enabled: false,
    retry: false,
    ...options,
  });
};

export const useGet = (
  url: string,
  fn: () => void,
  options?: queryOptions
): UseQueryResult<ResponseDataType> => {
  return useQuery({
    queryKey: [url],
    queryFn: fn,
    enabled: false,
    ...options,
  });
};

export const usePost = (
  url: string,
  params?: object,
  options?: queryOptions
): UseMutationResult => {
  return useMutation({
    mutationKey: [url, params],
    mutationFn: () => {
      return DefaultAxiosService.instance.post(url, { params });
    },
    ...options,
  });
};

export const useDeleteTodoList = (options?: queryOptions) => {
  return useMutation({
    mutationKey: ["/delete/todo"],
    mutationFn: (id: number) => {
      return DefaultAxiosService.instance.delete(`/todo/${id}`);
    },
    ...options,
  });
};

export const useUpdateTodoList = (options?: queryOptions) => {
  return useMutation({
    mutationKey: ["/update/todo"],
    mutationFn: ({ id, text }: { id: number; text: string }) => {
      return DefaultAxiosService.instance.put(`/todo/${id}`, { text });
    },
    ...options,
  });
};

export const useUpdateIsDone = (options?: queryOptions) => {
  return useMutation({
    mutationKey: ["/update/todo/isDone"],
    mutationFn: ({ id, isDone }: { id: number; isDone: boolean }) => {
      return DefaultAxiosService.instance.put(`/todo/${id}`, { isDone });
    },
    ...options,
  });
};
