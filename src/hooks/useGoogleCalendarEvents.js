import { useQuery } from "@tanstack/react-query";
import { getGoogleCalendarEvents } from "../services/calendar.service";

export const useGoogleCalendarEvents = (
  connectionId,
  { timeMin, timeMax }
) => {
  return useQuery({
    queryKey: [
      "google-calendar",
      connectionId,
      "events",
      timeMin,
      timeMax,
    ],
    queryFn: () =>
      getGoogleCalendarEvents(connectionId, { timeMin, timeMax }),
    enabled: Boolean(connectionId && timeMin && timeMax),
  });
};