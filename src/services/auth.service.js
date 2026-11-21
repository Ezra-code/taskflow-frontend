import api from "../lib/api";

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data.data;
};

export const refreshSession = async () => {
  const { data } = await api.post("/auth/refresh");
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

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const logoutAll = async (accessToken) => {
  const { data } = await api.post(
    "/auth/logout-all",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
};