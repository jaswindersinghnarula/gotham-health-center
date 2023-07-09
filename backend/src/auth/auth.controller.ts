import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as AuthService from "./auth.service";
import jwt from "jsonwebtoken";
import {
  getJWTToken,
  getUserByEmail,
  removeJWTToken,
  storeJWTToken,
} from "../user/user.service";
import { User, UserPayload } from "@prisma/client";

export async function login(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  if (await AuthService.authenticate(req.body.email, req.body.password)) {
    const user = await getUserByEmail(req.body.email);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await storeJWTToken(user?.id, refreshToken);
    return res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  }
  return res.status(401).json(null);
}

export async function refreshToken(req: Request, res: Response) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken === null) return res.sendStatus(401);

  const token = await getJWTToken(refreshToken);
  if (!token) return res.sendStatus(401);

  if (refreshToken !== token?.jwtToken) {
    return res.sendStatus(403);
  }

  jwt.verify(
    refreshToken,
    String(process.env.REFERSH_SECRET),
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      delete user.iat;
      const accessToken = generateAccessToken(user);
      res.status(200).json({ accessToken: accessToken });
    }
  );
}

export async function deleteToken(req: Request, res: Response) {
  await removeJWTToken(req.body.refreshToken);
  return res.sendStatus(204);
}

function generateAccessToken(user: any) {
  return jwt.sign(user, String(process.env.JWT_SECRET), {
    expiresIn: 60 * 60,
  });
}

function generateRefreshToken(user: any) {
  return jwt.sign(user, String(process.env.REFERSH_SECRET));
}
