import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader?.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, String(process.env.JWT_SECRET), (err, user) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      req.body.user = user;
      next();
    }
  });
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.body.user;
  if (user.role === "ADMIN") {
    next();
  } else {
    res.sendStatus(403);
  }
}
