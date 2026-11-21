
import api from "../lib/api";

export const getTodos = async (params = {}) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null
    )
  );

  const { data } = await api.get("/todos", {
    params: cleanedParams,
  });

  return data;
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

export const deleteTodo = async (id) => {
  const { data } = await api.delete(`/todos/${id}`);

  return data.data;
};

export const updateTodo = async ({ id, todoData }) => {
  const { data } = await api.patch(`/todos/${id}`, todoData);

  return data.data;
};