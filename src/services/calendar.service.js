
import api from "../lib/api";

export const initiateGoogleCalendarConnection = async () => {
  const { data } = await api.post("/auth/google/calendar");

  return data.data;
};

export const getConnectedGoogleAccounts = async () => {
  const { data } = await api.get("/auth/google/calendar/connections");

  return data.data.connections;
};

export const getGoogleCalendars = async (connectionId) => {
  const { data } = await api.get(
    `/auth/google/calendar/${connectionId}/calendars`
  );

  return data.data.calendars;
};