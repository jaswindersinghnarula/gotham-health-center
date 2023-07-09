import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as UserService from "./user.service";

export async function addUser(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const user = await UserService.createUser(req);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
export async function showUsers(req: Request, res: Response) {
  try {
    const users = await UserService.listUsers();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}
export async function getUserById(req: Request, res: Response) {
  try {
    const user = await UserService.getUser(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function editUser(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function removeUser(req: Request, res: Response) {
  try {
    await UserService.deleteUser(req.params.id);
    return res.status(204).json(null);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getUserRole(id: any) {
  return UserService.getUserRole(id);
}

export async function getUserByEmail(email: string) {
  return await UserService.getUserByEmail(email);
}
