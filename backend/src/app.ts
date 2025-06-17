import express from "express";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/auth";
import taskRoutes from "./routes/taskRoutes";
import profileRoutes from "./routes/profileRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hey!");
});

app.use("/api/tasks", verifyToken, taskRoutes);
app.use("/api/profile", verifyToken, profileRoutes);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
