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
exports.RootRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../user/user.service");
exports.RootRouter = express_1.default.Router();
exports.RootRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        Application: process.env.APP_NAME,
        Version: process.env.APP_VERSION,
        Developer: process.env.APP_DEVELOPER,
    });
}));
// All Doctors
exports.RootRouter.get("/doctors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctors = yield (0, user_service_1.getDoctors)();
    res.status(200).json(doctors);
}));
exports.RootRouter.get("/dashboard/stats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield (0, user_service_1.getStats)();
    res.status(200).json(stats);
}));
