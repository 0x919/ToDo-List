import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ email: res.locals.email, userId: res.locals.userId });
});

export default router;
