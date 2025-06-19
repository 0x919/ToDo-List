import { useState } from "react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleComplete = async () => {
    setLoading(true);
    setError(null);
    try {
      const updated: Task = { ...task, completed: !task.completed };
      await onUpdate(updated);
    } catch (err: unknown) {
      let message = "Failed to update task";
      if (err instanceof Error) message = err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditTitle(task.title);
    setIsEditing(true);
    setError(null);
  };

  const handleSave = async () => {
    if (editTitle.trim().length === 0) {
      setError("Title cannot be empty.");
      return;
    }
    if (editTitle === task.title) {
      setIsEditing(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const updated: Task = { ...task, title: editTitle };
      await onUpdate(updated);
      setIsEditing(false);
    } catch (err: unknown) {
      let message = "Failed to update task";
      if (err instanceof Error) message = err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setError(null);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;
    setLoading(true);
    setError(null);
    try {
      await onDelete(task.id);
    } catch (err: unknown) {
      let message = "Failed to delete task";
      if (err instanceof Error) message = err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 border-b">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
        disabled={loading}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        className="form-checkbox h-4 w-4 bg-blue-500 rounded focus:ring-2 focus:ring-blue-600"
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={loading}
            className="flex-1 border rounded p-1"
          />
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className={`flex-1 font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
            {task.title}
          </span>
          <button
            onClick={handleEditClick}
            disabled={loading}
            className="px-2 py-1 bg-blue-500 rounded disabled:opacity-50 hover:cursor-pointer hover:bg-blue-600"
          >
            ✏
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-2 py-1 bg-red-500 text-white rounded disabled:opacity-50 hover:cursor-pointer hover:bg-red-600"
          >
            🗑
          </button>
        </>
      )}
      {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
    </div>
  );
}
