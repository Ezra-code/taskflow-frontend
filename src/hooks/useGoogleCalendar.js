
import { useMutation } from "@tanstack/react-query";
import { initiateGoogleCalendarConnection } from "../services/calendar.service";

export const useGoogleCalendar = () => {
  return useMutation({
    mutationFn: initiateGoogleCalendarConnection,

    onSuccess: ({ authorizationUrl }) => {
      window.location.href = authorizationUrl;
    },
  });
};
