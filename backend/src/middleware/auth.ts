import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "JWT token missing" });
  }

  try {
    const isCorrect = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!isCorrect) {
      res.status(401).json({ error: "Invalid JWT token" });
      return;
    }

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};
