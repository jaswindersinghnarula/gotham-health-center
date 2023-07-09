import express, { Request, Response } from "express";
import { getDoctors, getStats } from "../user/user.service";

export const RootRouter = express.Router();

RootRouter.get("/", async (req: Request, res: Response) => {
  res.json({
    Application: process.env.APP_NAME,
    Version: process.env.APP_VERSION,
    Developer: process.env.APP_DEVELOPER,
  });
});

// All Doctors
RootRouter.get("/doctors", async (req: Request, res: Response) => {
  const doctors = await getDoctors();
  res.status(200).json(doctors);
});

RootRouter.get("/dashboard/stats", async (req: Request, res: Response) => {
  const stats = await getStats();
  res.status(200).json(stats);
});
