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
    `/auth/google/calendar/${connectionId}/calendars`,
  );

  return data.data.calendars;
};

export const getGoogleCalendarEvents = async (
  connectionId,
  { timeMin, timeMax },
) => {
  const { data } = await api.get(
    `/auth/google/calendar/${connectionId}/events`,
    {
      params: { timeMin, timeMax },
    },
  );

  return data.data.events;
};
