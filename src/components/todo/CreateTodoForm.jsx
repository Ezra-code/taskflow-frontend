
import { useState } from "react";
import { useCreateTodo } from "../../hooks/useCreateTodo";

export default function CreateTodoForm() {
  const createTodoMutation = useCreateTodo();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
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

    createTodoMutation.mutate(
      {
        ...formData,
        dueDate: formData.dueDate || null,
      },
      {
        onSuccess: () => {
          setFormData({
            title: "",
            description: "",
            dueDate: "",
            priority: "MEDIUM",
          });
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6"
    >
      <h2 className="text-lg font-semibold">Create a Todo</h2>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="What needs to be done?"
        required
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Add a description (optional)"
        rows={3}
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

      <button
        type="submit"
        disabled={createTodoMutation.isPending}
        className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
      </button>

      {createTodoMutation.isError && (
        <p className="text-sm text-red-600">
          {createTodoMutation.error.response?.data?.message ||
            "Failed to create Todo."}
        </p>
      )}
    </form>
  );
}
