import { Request, Response } from "express";
import * as AppointmentService from "./appointment.service";
import { validationResult } from "express-validator";

export async function createAppointment(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const appointment = await AppointmentService.createAppointment(req);
    return res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function listAppointments(req: Request, res: Response) {
  try {
    const appointments = await AppointmentService.listPetientAppointment(
      req.params.id
    );
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function isSlotAvailable(dateTime: any, docotrId: any) {
  try {
    const appointment = await AppointmentService.findAppointmentByDate(
      dateTime,
      docotrId
    );
    return appointment;
  } catch (error) {
    return null;
  }
}

export async function listBookedDates(req: Request, res: Response) {
  try {
    const dates = await AppointmentService.getBookedDates();
    return res.status(200).json(dates);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function removeAppointment(req: Request, res: Response) {
  try {
    await AppointmentService.deleteAppointment(req.params.id);
    return res.status(204).json(null);
  } catch (error) {
    res.status(500).json(error);
  }
}
