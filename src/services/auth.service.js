import api from "../lib/api";

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);

  return data.data;
};

export const getCurrentUser = async (accessToken) => {
  const { data } = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.data;
};