import { Request } from "express";
import { prisma } from "../db/connection";
import { User } from "@prisma/client";

type Appointment = {
  id: String;
  doctor: User;
  petient: User;
  dateTime: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type AppointmentDateOnly = {
  id: String;
  dateTime: Date | null;
};

export async function createAppointment(req: Request): Promise<Appointment> {
  return await prisma.appointment.create({
    data: {
      doctorId: req.body.doctorId,
      petientId: req.body.petientId,
      dateTime: new Date(req.body.dateTime),
    },
    select: {
      id: true,
      doctor: true,
      petient: true,
      dateTime: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function listPetientAppointment(id: any): Promise<Appointment[]> {
  return await prisma.appointment.findMany({
    where: {
      petientId: id,
    },
    select: {
      id: true,
      doctor: true,
      petient: true,
      dateTime: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function findAppointmentByDate(
  dateTime: any,
  docotrId: any
): Promise<AppointmentDateOnly | null> {
  return await prisma.appointment.findFirst({
    where: {
      doctorId: docotrId,
      dateTime: new Date(dateTime),
      deletedAt: null,
    },
    select: {
      id: true,
      dateTime: true,
    },
  });
}

export async function getBookedDates(): Promise<AppointmentDateOnly[]> {
  return await prisma.appointment.findMany({
    where: {
      dateTime: {
        gte: new Date(),
      },
      deletedAt: null,
    },
    select: {
      id: true,
      dateTime: true,
    },
  });
}

export async function deleteAppointment(id: any) {
  return await prisma.appointment.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
