import { createFileRoute } from "@tanstack/react-router";
import { useTodos } from "../hooks/useTodos";
import CreateTodoForm from "../components/todo/CreateTodoForm";
import { useToggleTodo } from "../hooks/useToggleTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useState } from "react";
import { Pencil, X } from "lucide-react";
import EditTodoForm from "../components/todo/EditTodoForm";
// import EditTodoForm from "../components/todos/EditTodoForm";
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
  const [editingTodo, setEditingTodo] = useState(null);
  const toggleTodoMutation = useToggleTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?",
    );

    if (confirmed) {
      deleteTodoMutation.mutate(id);
    }
  };
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
        <h1 className="mb-6 text-3xl font-bold text-slate-900">My Todos</h1>
        <CreateTodoForm />
        {todos.length === 0 ? (
          <p className="text-slate-500">No todos yet. Create your first one!</p>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <article
                key={todo.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex justify-between">
                  {" "}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    disabled={toggleTodoMutation.isPending}
                    onChange={(event) =>
                      toggleTodoMutation.mutate({
                        id: todo.id,
                        completed: event.target.checked,
                      })
                    }
                    className="h-5 w-5 cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-evenly">
                    <button
                      onClick={() => handleDelete(todo.id)}
                      disabled={deleteTodoMutation.isPending}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setEditingTodo(todo)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 flex items-center justify-between"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                  </div>
                </div>
                <h2
                  className={`font-semibold ${
                    todo.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-900"
                  }`}
                >
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

        {editingTodo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Edit Todo</h2>

                <button
                  onClick={() => setEditingTodo(null)}
                  className="rounded-lg p-2 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <EditTodoForm
                key={editingTodo.id}
                todo={editingTodo}
                onCancel={() => setEditingTodo(null)}
                onSuccess={() => setEditingTodo(null)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
