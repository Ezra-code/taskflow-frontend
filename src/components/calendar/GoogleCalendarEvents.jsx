
import { useMemo } from "react";
import { useGoogleCalendarEvents } from "../../hooks/useGoogleCalendarEvents";

export default function GoogleCalendarEvents({ connectionId }) {
  const now = new Date();

  const { timeMin, timeMax } = useMemo(() => {
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 30);

  return {
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
  };
}, []);

  const {
    data: events = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGoogleCalendarEvents(connectionId, { timeMin, timeMax });

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading calendar events...</p>;
  }

  if (isError) {
    return (
      <div className="mt-3">
        <p className="text-sm text-red-600">
          {error.response?.data?.message || "Unable to load calendar events."}
        </p>
        <button onClick={() => refetch()} className="mt-2 text-sm underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <h3 className="font-semibold text-slate-800">
        Upcoming events
      </h3>

      {events.length === 0 ? (
        <p className="text-sm text-slate-500">
          No upcoming events in the next 30 days.
        </p>
      ) : (
        events.map((event) => (
          <article
            key={event.id}
            className="rounded-lg border border-slate-100 p-3"
          >
            <p className="font-medium text-slate-800">
              {event.summary || "Untitled event"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {new Date(
                event.start?.dateTime || event.start?.date
              ).toLocaleString()}
            </p>

            {event.location && (
              <p className="mt-1 text-xs text-slate-400">
                {event.location}
              </p>
            )}
          </article>
        ))
      )}
    </div>
  );
}
