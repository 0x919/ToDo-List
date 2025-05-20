import express from "express";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hey!");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
