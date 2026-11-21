
import api from "../lib/api";

export const getTodos = async (params = {}) => {
  const { data } = await api.get("/todos", { params });

  return data.data;
};


export const createTodo = async (todoData) => {
  const { data } = await api.post("/todos", todoData);

  return data.data;
};


export const toggleTodoCompletion = async ({ id, completed }) => {
  const { data } = await api.patch(`/todos/${id}/completion`, {
    completed,
  });

  return data.data;
};
