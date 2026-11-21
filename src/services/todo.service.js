
import api from "../lib/api";

export const getTodos = async (params = {}) => {
  const { data } = await api.get("/todos", { params });

  return data.data;
};
