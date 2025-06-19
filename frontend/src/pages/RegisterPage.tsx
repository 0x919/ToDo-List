import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function RegisterPage() {
  const { isAuthenticated, register, error, loading, resetError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    resetError();
  }, [resetError]);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/tasks");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (password !== repeatPassword) {
      setPasswordError("The passwords must match");
      return;
    }
    register(email, password);
  };

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
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
          <div>
            <input
              type="password"
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Repeat password"
              className="border border-gray-200 rounded-lg px-2"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-sky-400 rounded-lg px-5 py-1 hover:cursor-pointer hover:bg-sky-500"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p>
            Already have an account?{" "}
            {
              <Link to="/login" className="underline text-blue-500">
                Log in
              </Link>
            }
          </p>
          {error && <p className="text-red-600">{error}</p>}
          {passwordError && <p className="text-red-600">{passwordError}</p>}
        </form>
      </div>
    </div>
  );
}
