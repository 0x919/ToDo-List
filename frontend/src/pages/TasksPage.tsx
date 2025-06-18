import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { TaskItem } from "../components/TaskItem";

export default function TasksPage() {
  const { tasks, updateTask, deleteTask, addTask, error, fetching, adding, refetch } = useTasks();
  const { isAuthenticated } = useAuth();
  const [newTitle, setNewTitle] = useState("");
  const [addError, setAddError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    if (newTitle.trim().length === 0) {
      setAddError("Title cannot be empty.");
      return;
    }
    try {
      await addTask(newTitle.trim());
      setNewTitle("");
    } catch (err: unknown) {
      let message = "Failed to add task";
      if (err instanceof Error) message = err.message;
      setAddError(message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="xl:max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <form onSubmit={handleAdd} className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="New task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            disabled={adding}
            className="flex-1 border rounded p-2"
          />
          <button
            type="submit"
            disabled={adding}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Add
          </button>
        </form>
        {addError && <div className="text-red-500 mb-2">{addError}</div>}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {fetching ? (
          <div>Loading tasks...</div>
        ) : (
          <div className="border rounded">
            {tasks.length === 0 ? (
              <div className="p-4 text-gray-500">No tasks yet. Add one!</div>
            ) : (
              tasks.map((task) => <TaskItem key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />)
            )}
          </div>
        )}
        <button
          onClick={refetch}
          disabled={fetching}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
