import express from "express";
import * as AuthController from "./auth.controller";
import { check } from "express-validator";
import { getUserByEmail } from "../user/user.controller";
import { authenticateToken } from "./auth.middleware";

export const AuthRouter = express.Router();

const errorMessage = "Credentials does not match our records.";

const AuthValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is empty.")
    .isEmail()
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (!user) {
        throw new Error(errorMessage);
      }
    }),
  check("password").notEmpty().withMessage(errorMessage),
];

AuthRouter.post("/login", AuthValidator, AuthController.login);

AuthRouter.post("/token", AuthController.refreshToken);

AuthRouter.post("/logout", AuthController.deleteToken);
