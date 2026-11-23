import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { logout } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { CalendarDays } from "lucide-react";
import { useGoogleCalendar } from "../hooks/useGoogleCalendar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isLoading, isAuthenticated, logoutUser } = useAuth();
  const googleCalendarMutation = useGoogleCalendar();
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Restoring your session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      toast.success("Logged out successfully");
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout error:", error);
      console.error("Response:", error.response?.data);
      console.error("Status:", error.response?.status);

      toast.error(
        error.response?.data?.message || error.message || "Unable to log out",
      );
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Welcome, {user?.fullName}</h1>

      <p className="mt-2 text-slate-500">Your TaskFlow workspace is ready.</p>
      <button
        onClick={() => {
          googleCalendarMutation.mutate(undefined, {
            onError: (error) => {
              toast.error(
                error.response?.data?.message ||
                  "Failed to initiate Google Calendar connection",
              );
            },
          });
        }}
        disabled={googleCalendarMutation.isPending}
        className="flex items-center gap-3 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        <CalendarDays size={20} />

        {googleCalendarMutation.isPending
          ? "Connecting..."
          : "Connect Google Calendar"}
      </button>
      <button
        onClick={handleLogout}
        className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>
    </main>
  );
}
