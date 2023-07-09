"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.getBookedDates = exports.findAppointmentByDate = exports.listPetientAppointment = exports.createAppointment = void 0;
const connection_1 = require("../db/connection");
function createAppointment(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.appointment.create({
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
    });
}
exports.createAppointment = createAppointment;
function listPetientAppointment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.appointment.findMany({
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
    });
}
exports.listPetientAppointment = listPetientAppointment;
function findAppointmentByDate(dateTime, docotrId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.appointment.findFirst({
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
    });
}
exports.findAppointmentByDate = findAppointmentByDate;
function getBookedDates() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.appointment.findMany({
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
    });
}
exports.getBookedDates = getBookedDates;
function deleteAppointment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.appointment.update({
            where: {
                id: id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    });
}
exports.deleteAppointment = deleteAppointment;
