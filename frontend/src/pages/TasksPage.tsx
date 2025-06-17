import { useEffect } from "react";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function TasksPage() {
  const { tasks } = useTasks();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return (
    <div>
      {tasks.map((task) => (
        <p>
          {task.title}: {task.completed ? "done" : "not done"}
        </p>
      ))}
    </div>
  );
}
