import express from "express";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/auth";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hey!");
});

app.use("/api/tasks", verifyToken, taskRoutes);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
