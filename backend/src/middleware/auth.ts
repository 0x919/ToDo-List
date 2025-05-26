import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "JWT token missing" });
    return;
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.email = (data as any).email;
    res.locals.userId = (data as any).userId;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid JWT token" });
  }
};
