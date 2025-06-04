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

    res.json({ title, completed: false, id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [res.locals.userId]);
    const sanitizedItems = result.rows.map(({ user_id, ...rest }) => rest);
    res.json(sanitizedItems);
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

router.delete("/", async (req, res) => {
  const { id } = req.body;

  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [id, res.locals.userId]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Task not found or authorization failed" });
      return;
    }

    res.json({ message: "Deleted task" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
