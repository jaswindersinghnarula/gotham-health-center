import { Request } from "express";
import { prisma } from "../db/connection";
import bcrypt from "bcrypt";
import { Detail, Role } from "@prisma/client";

type User = {
  id: String | null;
  firstName: String | null;
  lastName: String | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type UserRole = {
  role: Role | null;
};

type UserPayload = {
  id: String | null;
  firstName: String | null;
  lastName: String | null;
  role: Role;
};

type Doctor = {
  id: String;
  firstName: String | null;
  lastName: String | null;
  Detail: Detail | null;
};

type Stats = {
  doctors: number;
  petients: number;
  guests: number;
};

export async function listUsers(): Promise<User[]> {
  return prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      deletedAt: null,
    },
  });
}

export async function createUser(req: Request): Promise<User> {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(req.body.password, salt);
  return await prisma.user.create({
    data: {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      Detail: {
        create: {
          avatar: `https://eu.ui-avatars.com/api/?name=${req.body.firstName}${
            req.body.lastName ? "+" + req.body.lastName : ""
          }&size=250&background=52be80&color=ffffff`,
        },
      },
      Login: {
        create: {
          password: hashed,
        },
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getUser(id: any): Promise<User | null> {
  return await prisma.user.findFirst({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      id: id,
      deletedAt: null,
    },
  });
}

export async function updateUser(id: any, data: any): Promise<User> {
  delete data.user;
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      ...data,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function deleteUser(id: any): Promise<User> {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}

export async function getUserRole(id: any): Promise<UserRole | null> {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      role: true,
    },
  });
}

export async function getUserByEmail(
  email: string
): Promise<UserPayload | null> {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  });
}

export async function storeJWTToken(id: any, token: string) {
  return await prisma.user.update({
    data: {
      Login: {
        update: {
          jwtToken: token,
        },
      },
    },
    where: {
      id: id,
    },
  });
}

export async function getJWTToken(token: string) {
  return await prisma.login.findFirst({
    select: {
      jwtToken: true,
    },
    where: {
      jwtToken: token,
    },
  });
}

export async function removeJWTToken(token: string) {
  return await prisma.login.update({
    where: {
      jwtToken: token,
    },
    data: {
      jwtToken: null,
    },
  });
}

export async function getDoctors(): Promise<Doctor[]> {
  return await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      Detail: true,
    },
    where: {
      role: "DOCTOR",
      deletedAt: null,
    },
  });
}

export async function getStats(): Promise<Stats> {
  const doctors = await prisma.user.findMany({
    select: {
      id: true,
    },
    where: {
      role: "DOCTOR",
      deletedAt: null,
    },
  });
  const petients = await prisma.user.findMany({
    select: {
      id: true,
    },
    where: {
      role: "PATIENT",
      deletedAt: null,
    },
  });
  const guests = await prisma.user.findMany({
    select: {
      id: true,
    },
    where: {
      role: "GUEST",
      deletedAt: null,
    },
  });
  return {
    doctors: doctors.length,
    petients: petients.length,
    guests: guests.length,
  };
}
