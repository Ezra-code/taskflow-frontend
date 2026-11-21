
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodoCompletion } from "../services/todo.service";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTodoCompletion,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
