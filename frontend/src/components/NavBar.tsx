import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="w-screen max-h-[50px] bg-gray-200 flex items-center p-2">
      <div className="flex-1 flex justify-start">
        <Link to="/" className="text-2xl font-semibold">
          FocusList
        </Link>
      </div>
      {isAuthenticated ? (
        <div className="flex-1 flex justify-center">
          <h1 className="font-semibold">{user?.email}</h1>
        </div>
      ) : (
        <div className="flex-1"></div>
      )}
      <div className="flex-1 flex justify-end">
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="bg-blue-500 rounded-lg px-5 py-1 hover:cursor-pointer hover:bg-blue-600 text-white"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 rounded-lg px-5 py-1 hover:cursor-pointer hover:bg-blue-600 text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
