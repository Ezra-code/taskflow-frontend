
import { CalendarDays, RefreshCw, Unplug } from "lucide-react";
import { useGoogleCalendarAccounts } from "../../hooks/useGoogleCalendarAccounts";
import { useGoogleCalendar } from "../../hooks/useGoogleCalendar";
import { useGoogleCalendars } from "../../hooks/useGoogleCalendars";
import GoogleCalendarEvents from "./GoogleCalendarEvents";



function GoogleAccountCalendars({ connectionId }) {
  const { data: calendars = [], isLoading, isError } =
    useGoogleCalendars(connectionId);

  if (isLoading) {
    return <p className="mt-3 text-sm text-slate-400">Loading calendars...</p>;
  }

  if (isError) {
    return <p className="mt-3 text-sm text-red-500">Failed to load calendars.</p>;
  }

  return (
    <div className="mt-3 space-y-2">
      {calendars.map((calendar) => (
        <div
          key={calendar.id}
          className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
        >
          <div>
            <p className="text-sm font-medium text-slate-700">
              {calendar.summary}
              {calendar.primary && (
                <span className="ml-2 text-xs text-indigo-600">Primary</span>
              )}
            </p>
            <p className="text-xs text-slate-400">{calendar.timeZone}</p>
          </div>

          <span className="text-xs text-slate-500">
            {calendar.accessRole}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function GoogleCalendarConnections() {
  const {
    data: connections = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGoogleCalendarAccounts();

  const connectMutation = useGoogleCalendar();

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading connected accounts...</p>;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 p-4">
        <p className="text-sm text-red-600">
          {error.response?.data?.message || "Failed to load Google accounts."}
        </p>
        <button onClick={() => refetch()} className="mt-2 text-sm underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Google Calendar</h2>
          <p className="text-sm text-slate-500">
            Manage your connected Google accounts.
          </p>
        </div>

        <CalendarDays className="text-indigo-600" size={24} />
      </div>

      <div className="space-y-3">
        {connections.length === 0 ? (
          <p className="text-sm text-slate-500">
            No Google accounts connected yet.
          </p>
        ) : (
          connections.map((connection) => (
            <div
              key={connection.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
            >
              <div>
                <p className="font-medium text-slate-800">
                  {connection.accountEmail}
                </p>
                <p className="mt-1 text-xs text-green-600">
                  Connected
                </p>
              </div>

              <Unplug size={18} className="text-slate-400" />
              <GoogleCalendarEvents connectionId={connection.id} />
            </div>
            
          ))
        )}
        
      </div>

      <button
        onClick={() => connectMutation.mutate()}
        disabled={connectMutation.isPending}
        className="mt-5 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        <RefreshCw size={16} />
        {connectMutation.isPending ? "Connecting..." : "Connect another account"}
      </button>
    </section>
  );
}
