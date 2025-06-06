import { useState, useEffect } from "react";
import axios from "axios";
import type { Task } from "../types";
import { handleAxiosError } from "../lib/utils";

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
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
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
      const response = await axios.post("/api/tasks", { title });
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError(handleAxiosError(err));
    } finally {
      setAdding(false);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    setUpdating(true);
    setError(null);
    try {
      await axios.put("/api/tasks", updatedTask);
      setTasks([...tasks.filter((task) => task.id !== updatedTask.id), updatedTask]);
    } catch (err) {
      setError(handleAxiosError(err));
    } finally {
      setUpdating(false);
    }
  };

  const deleteTask = async (id: number) => {
    setDeleting(true);
    setError(null);
    try {
      await axios.delete("/api/tasks", { data: { id } });
      setTasks([...tasks.filter((task) => task.id !== id)]);
    } catch (err) {
      setError(handleAxiosError(err));
    } finally {
      setDeleting(false);
    }
  };

  return { tasks, error, fetching, adding, deleting, updating, addTask, deleteTask, updateTask, refetch: fetchTasks };
}
