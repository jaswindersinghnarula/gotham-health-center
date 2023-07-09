import express, { Request, Response } from "express";
import { check } from "express-validator";
import * as AppointmentController from "./appointment.controller";
import { getUserRole } from "../user/user.controller";

export const AppointmentRouter = express.Router();

const AppointmentCreationValidation = [
  check("doctorId")
    .notEmpty()
    .withMessage("Can not book appointment without doctor.")
    .custom(async (value) => {
      const user = await getUserRole(value);
      if (user?.role !== "DOCTOR")
        throw new Error("Provided user is not a doctor.");
    }),
  check("petientId")
    .notEmpty()
    .withMessage("Can not book appointment without petient.")
    .custom(async (value) => {
      const user = await getUserRole(value);
      if (user?.role !== "PATIENT")
        throw new Error("Provided user is not a petient.");
    }),
  check("dateTime")
    .notEmpty()
    .withMessage("Date must not be empty.")
    .custom(async (value, { req }) => {
      const appointment = await AppointmentController.isSlotAvailable(
        value,
        req.body.docotrId
      );
      console.log(appointment);
      if (appointment) {
        throw new Error("Slot is not available.");
      }
    }),
];

AppointmentRouter.get("/:id", AppointmentController.listAppointments);

AppointmentRouter.get(
  "/all/booked/dates",
  AppointmentController.listBookedDates
);

AppointmentRouter.post(
  "/",
  AppointmentCreationValidation,
  AppointmentController.createAppointment
);

AppointmentRouter.delete("/:id", AppointmentController.removeAppointment);
