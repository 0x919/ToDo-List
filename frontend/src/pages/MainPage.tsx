import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center pt-10">
        <h1 className="text-5xl font-semibold mb-5">A simple to do list to manage it all</h1>
        <p className="text-3xl mb-5">Easily manage your personal tasks</p>
        <Link to="/register" className="text-3xl bg-blue-500 text-white p-1 rounded-lg">
          Get Started For Free
        </Link>
      </div>
    </div>
  );
}
