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
exports.authenticate = void 0;
const connection_1 = require("../db/connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
function authenticate(email, password) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield connection_1.prisma.user.findFirst({
            where: {
                email: email,
                deletedAt: null,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                Login: true,
            },
        });
        const hashed = ((_a = user === null || user === void 0 ? void 0 : user.Login) === null || _a === void 0 ? void 0 : _a.password) || "";
        return yield bcrypt_1.default.compare(password, hashed);
    });
}
exports.authenticate = authenticate;
