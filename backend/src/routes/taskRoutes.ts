import express from "express";
import pool from "../lib/db";

const router = express.Router();

router.post("/", async (req, res) => {
  const { title } = req.body;

  try {
    const result = await pool.query("INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING id", [
      title,
      res.locals.userId,
    ]);

    res.json({ message: "Created task" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [res.locals.userId]);
  } catch (error) {}
});

export default router;
