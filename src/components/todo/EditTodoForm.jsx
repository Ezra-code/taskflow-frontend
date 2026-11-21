
import { useState } from "react";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";

export default function EditTodoForm({ todo, onCancel, onSuccess }) {
  const updateTodoMutation = useUpdateTodo();

  const [formData, setFormData] = useState({
    title: todo?.title ?? "",
    description: todo?.description ?? "",
    dueDate: todo?.dueDate
      ? new Date(todo?.dueDate).toISOString().split("T")[0]
      : "",
    priority: todo?.priority ?? "MEDIUM",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) return;

    updateTodoMutation.mutate(
      {
        id: todo.id,
        todoData: {
          ...formData,
          dueDate: formData.dueDate || null,
        },
      },
      {
        onSuccess: () => onSuccess?.(),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Todo title"
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        placeholder="Description"
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        >
          <option value="LOW">Low priority</option>
          <option value="MEDIUM">Medium priority</option>
          <option value="HIGH">High priority</option>
        </select>
      </div>

      {updateTodoMutation.isError && (
        <p className="text-sm text-red-600">
          {updateTodoMutation.error.response?.data?.message ||
            "Failed to update Todo."}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-4 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={updateTodoMutation.isPending}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {updateTodoMutation.isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
