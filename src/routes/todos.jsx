
import { createFileRoute } from "@tanstack/react-router";
import { useTodos } from "../hooks/useTodos";

export const Route = createFileRoute("/todos")({
  component: TodosPage,
});

function TodosPage() {
  const { data, isLoading, isError, error } = useTodos({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  if (isLoading) {
    return <p className="p-8">Loading your todos...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-red-600">
        {error.response?.data?.message || "Failed to load todos."}
      </p>
    );
  }

  const todos = data?.todos ?? [];

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          My Todos
        </h1>

        {todos.length === 0 ? (
          <p className="text-slate-500">No todos yet. Create your first one!</p>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <article
                key={todo.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="font-semibold text-slate-900">
                  {todo.title}
                </h2>

                {todo.description && (
                  <p className="mt-2 text-sm text-slate-500">
                    {todo.description}
                  </p>
                )}

                <p className="mt-3 text-xs text-slate-400">
                  {todo.completed ? "Completed" : "Pending"}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
