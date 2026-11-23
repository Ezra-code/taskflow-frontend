import { useQuery } from "@tanstack/react-query";
import { getGoogleCalendars } from "../services/calendar.service";

export const useGoogleCalendars = (connectionId) => {
  return useQuery({
    queryKey: ["google-calendar", connectionId, "calendars"],
    queryFn: () => getGoogleCalendars(connectionId),
    enabled: Boolean(connectionId),
  });
};