import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { isAuthenticated, login, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/tasks");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login..");
    login(email, password);
    console.log(isAuthenticated);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            placeholder="Email"
            className="border border-gray-200 rounded-lg px-2"
          />
        </div>
        <div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Password"
            className="border border-gray-200 rounded-lg px-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-200 rounded-lg px-5 py-1 hover:cursor-pointer hover:bg-gray-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
