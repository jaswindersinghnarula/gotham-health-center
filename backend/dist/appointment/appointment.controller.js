"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.removeAppointment = exports.listBookedDates = exports.isSlotAvailable = exports.listAppointments = exports.createAppointment = void 0;
const AppointmentService = __importStar(require("./appointment.service"));
const express_validator_1 = require("express-validator");
function createAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        try {
            const appointment = yield AppointmentService.createAppointment(req);
            return res.status(200).json(appointment);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    });
}
exports.createAppointment = createAppointment;
function listAppointments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appointments = yield AppointmentService.listPetientAppointment(req.params.id);
            return res.status(200).json(appointments);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    });
}
exports.listAppointments = listAppointments;
function isSlotAvailable(dateTime, docotrId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appointment = yield AppointmentService.findAppointmentByDate(dateTime, docotrId);
            return appointment;
        }
        catch (error) {
            return null;
        }
    });
}
exports.isSlotAvailable = isSlotAvailable;
function listBookedDates(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dates = yield AppointmentService.getBookedDates();
            return res.status(200).json(dates);
        }
        catch (error) {
            res.status(500).json(error);
        }
    });
}
exports.listBookedDates = listBookedDates;
function removeAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield AppointmentService.deleteAppointment(req.params.id);
            return res.status(204).json(null);
        }
        catch (error) {
            res.status(500).json(error);
        }
    });
}
exports.removeAppointment = removeAppointment;
