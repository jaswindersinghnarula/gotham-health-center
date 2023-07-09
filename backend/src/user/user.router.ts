import express from "express";
import { check } from "express-validator";
import * as UserController from "./user.controller";
import { authenticateToken, verifyAdmin } from "../auth/auth.middleware";

export const UserRouter = express.Router();
const roles = ["ADMIN", "DOCTOR", "PATIENT", "GUEST"];

const UserCreationValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email can not be empty")
    .isEmail()
    .withMessage("Invalid Email.")
    .custom(async (value) => {
      const user = await UserController.getUserByEmail(value);
      if (user) throw new Error(`Account with email ${value} already exists.`);
    }),
  check("firstName")
    .notEmpty()
    .withMessage("First name can Not be empty.")
    .isLength({ max: 50 })
    .withMessage("First name legnth can not exceed 50 characters."),
  check("lastName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Last name legnth can not exceed 50 characters."),
  check("password")
    .notEmpty()
    .withMessage("Password can not be empty.")
    .isLength({
      min: 8,
      max: 25,
    }),
  check("role")
    .optional()
    .custom(async (value) => {
      if (!(await roles.includes(value))) {
        throw new Error("Invalid role value.");
      }
    }),
];
const UserUpdateValidation = [
  check("firstName")
    .isLength({ max: 50 })
    .withMessage("First name legnth can not exceed 50 characters."),
  check("lastName")
    .isLength({ max: 50 })
    .withMessage("Last name legnth can not exceed 50 characters."),
  check("password")
    .optional()
    .isLength({
      min: 8,
      max: 25,
    })
    .withMessage("Password must be between 8 to 25 characters long."),
  check("role")
    .optional()
    .custom(async (value) => {
      if (!(await roles.includes(value))) {
        throw new Error("Invalid role value.");
      }
    }),
];

// Create
UserRouter.post(
  "/",
  [authenticateToken, verifyAdmin, ...UserCreationValidation],
  UserController.addUser
);

// Read All
UserRouter.get("/", [authenticateToken, verifyAdmin], UserController.showUsers);

// Read by id
UserRouter.get(
  "/:id",
  [authenticateToken, verifyAdmin],
  UserController.getUserById
);

// Update
UserRouter.patch(
  "/:id",
  [authenticateToken, verifyAdmin, ...UserUpdateValidation],
  UserController.editUser
);

// Delete
UserRouter.delete(
  "/:id",
  [authenticateToken, verifyAdmin],
  UserController.removeUser
);
