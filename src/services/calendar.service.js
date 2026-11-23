
import api from "../lib/api";

export const initiateGoogleCalendarConnection = async () => {
  const { data } = await api.post("/auth/google/calendar");

  return data.data;
};
