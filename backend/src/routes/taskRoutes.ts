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
    res.json(result.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  const { id, title, completed } = req.body;

  try {
    const result = await pool.query("UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4", [
      title,
      completed,
      id,
      res.locals.userId,
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Task not found or authorization failed" });
      return;
    }

    res.json({ message: "Modified task" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
