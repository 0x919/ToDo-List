import { useState, useEffect } from "react";
import type { Task } from "../types";
import { handleAxiosError } from "../lib/utils";
import apiClient from "../lib/apiClient";

function sortTasksByCompletion(tasks: Task[]): Task[] {
  return tasks.slice().sort((a, b) => {
    return (a.completed ? 1 : 0) - (b.completed ? 1 : 0);
  });
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetching, setFetching] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setFetching(true);
    setError(null);
    try {
      const response = await apiClient.get("/api/tasks");
      const sorted = sortTasksByCompletion(response.data);
      setTasks(sorted);
    } catch (err) {
      setError(handleAxiosError(err));
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title: string) => {
    setAdding(true);
    setError(null);
    try {
      const response = await apiClient.post("/api/tasks", { title });
      const newTask: Task = response.data;
      setTasks((prev) => {
        const merged = [...prev, newTask];
        return sortTasksByCompletion(merged);
      });
    } catch (err) {
      throw handleAxiosError(err);
    } finally {
      setAdding(false);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    setUpdating(true);
    setError(null);
    try {
      await apiClient.put("/api/tasks", updatedTask);
      setTasks((prevTasks) => {
        const replaced = prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
        return sortTasksByCompletion(replaced);
      });
    } catch (err) {
      throw handleAxiosError(err);
    } finally {
      setUpdating(false);
    }
  };

  const deleteTask = async (id: number) => {
    setDeleting(true);
    setError(null);
    try {
      await apiClient.delete("/api/tasks", { data: { id } });
      setTasks([...tasks.filter((task) => task.id !== id)]);
    } catch (err) {
      throw handleAxiosError(err);
    } finally {
      setDeleting(false);
    }
  };

  return { tasks, error, fetching, adding, deleting, updating, addTask, deleteTask, updateTask, refetch: fetchTasks };
}
