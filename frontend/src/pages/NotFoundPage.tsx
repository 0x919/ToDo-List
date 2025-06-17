import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>404 Not Found</h1>
      <Link to="/" className="mt-2 bg-gray-300 rounded-md px-2">
        Home
      </Link>
    </div>
  );
}
