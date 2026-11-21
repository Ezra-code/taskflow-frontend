import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";


export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Restoring your session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.fullName}
      </h1>

      <p className="mt-2 text-slate-500">
        Your TaskFlow workspace is ready.
      </p>
    </main>
  );
}