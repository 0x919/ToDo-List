import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { AuthProvider } from "./lib/AuthProvider.tsx";
import TasksPage from "./pages/TasksPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <NotFoundPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/tasks", element: <TasksPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
