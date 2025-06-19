import express from "express";
import pool from "../lib/db.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (rows.length > 0) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query("INSERT INTO users (email, passwordHash) VALUES ($1, $2) RETURNING id", [
      email,
      hashedPassword,
    ]);

    const token = jwt.sign({ email, userId: result.rows[0].id }, process.env.JWT_SECRET as string);

    res
      .cookie("token", token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json({ msg: "User registered!" });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (rows.length === 0) {
      res.status(400).json({ error: "User does not exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, rows[0].passwordhash);
    if (!isMatch) {
      res.status(401).json({ error: "Wrong password" });
      return;
    }

    const token = jwt.sign({ email, userId: rows[0].id }, process.env.JWT_SECRET as string);
    res
      .cookie("token", token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json({ message: "Logged in successfully" });
  } catch (error) {}
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  res.json({ message: "Logged out" });
});

export default router;
