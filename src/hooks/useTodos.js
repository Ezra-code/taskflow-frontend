
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../services/todo.service";
import { useAuth } from "../context/AuthContext";

export const useTodos = (params = {}) => {
  const { isLoading, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["todos", params],
    queryFn: () => getTodos(params),
    enabled: !isLoading && isAuthenticated,
  });
};
