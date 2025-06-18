import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="w-screen max-h-[50px] bg-gray-200 flex flex-col items-center p-2">
      {isAuthenticated ? (
        <div className="flex justify-between items-center w-screen px-2">
          <h1 className="font-semibold">{user?.email}</h1>
          <button onClick={logout} className="bg-sky-400 rounded-lg px-5 py-1 hover:cursor-pointer hover:bg-sky-500">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex justify-end w-screen px-2">
          <Link to="/login" className="bg-sky-400 rounded-lg px-5 py-1 hover:cursor-pointer hover:bg-sky-500">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
