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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.getDoctors = exports.removeJWTToken = exports.getJWTToken = exports.storeJWTToken = exports.getUserByEmail = exports.getUserRole = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.listUsers = void 0;
const connection_1 = require("../db/connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
function listUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_1.prisma.user.findMany({
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
    });
}
exports.listUsers = listUsers;
function createUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        const hashed = yield bcrypt_1.default.hash(req.body.password, salt);
        return yield connection_1.prisma.user.create({
            data: {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                Detail: {
                    create: {
                        avatar: `https://eu.ui-avatars.com/api/?name=${req.body.firstName}${req.body.lastName ? "+" + req.body.lastName : ""}&size=250&background=52be80&color=ffffff`,
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
    });
}
exports.createUser = createUser;
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.user.findFirst({
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
    });
}
exports.getUser = getUser;
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        delete data.user;
        return yield connection_1.prisma.user.update({
            where: {
                id: id,
            },
            data: Object.assign({}, data),
            select: {
                id: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    });
}
exports.updateUser = updateUser;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    });
}
exports.deleteUser = deleteUser;
function getUserRole(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.user.findFirst({
            where: {
                id: id,
            },
            select: {
                role: true,
            },
        });
    });
}
exports.getUserRole = getUserRole;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.user.findFirst({
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
    });
}
exports.getUserByEmail = getUserByEmail;
function storeJWTToken(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.user.update({
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
    });
}
exports.storeJWTToken = storeJWTToken;
function getJWTToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.login.findFirst({
            select: {
                jwtToken: true,
            },
            where: {
                jwtToken: token,
            },
        });
    });
}
exports.getJWTToken = getJWTToken;
function removeJWTToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.login.update({
            where: {
                jwtToken: token,
            },
            data: {
                jwtToken: null,
            },
        });
    });
}
exports.removeJWTToken = removeJWTToken;
function getDoctors() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.prisma.user.findMany({
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
    });
}
exports.getDoctors = getDoctors;
function getStats() {
    return __awaiter(this, void 0, void 0, function* () {
        const doctors = yield connection_1.prisma.user.findMany({
            select: {
                id: true,
            },
            where: {
                role: "DOCTOR",
                deletedAt: null,
            },
        });
        const petients = yield connection_1.prisma.user.findMany({
            select: {
                id: true,
            },
            where: {
                role: "PATIENT",
                deletedAt: null,
            },
        });
        const guests = yield connection_1.prisma.user.findMany({
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
    });
}
exports.getStats = getStats;
