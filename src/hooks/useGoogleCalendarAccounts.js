import { useQuery } from "@tanstack/react-query";
import { getConnectedGoogleAccounts } from "../services/calendar.service";
import { useAuth } from "../context/AuthContext";

export const useGoogleCalendarAccounts = () => {
  const { isLoading, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["google-calendar", "connections"],
    queryFn: getConnectedGoogleAccounts,
    enabled: !isLoading && isAuthenticated,
  });
};