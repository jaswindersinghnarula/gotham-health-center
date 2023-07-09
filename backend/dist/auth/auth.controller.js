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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToken = exports.refreshToken = exports.login = void 0;
const express_validator_1 = require("express-validator");
const AuthService = __importStar(require("./auth.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../user/user.service");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        if (yield AuthService.authenticate(req.body.email, req.body.password)) {
            const user = yield (0, user_service_1.getUserByEmail)(req.body.email);
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            yield (0, user_service_1.storeJWTToken)(user === null || user === void 0 ? void 0 : user.id, refreshToken);
            return res
                .status(200)
                .json({ accessToken: accessToken, refreshToken: refreshToken });
        }
        return res.status(401).json(null);
    });
}
exports.login = login;
function refreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.body.refreshToken;
        if (refreshToken === null)
            return res.sendStatus(401);
        const token = yield (0, user_service_1.getJWTToken)(refreshToken);
        if (!token)
            return res.sendStatus(401);
        if (refreshToken !== (token === null || token === void 0 ? void 0 : token.jwtToken)) {
            return res.sendStatus(403);
        }
        jsonwebtoken_1.default.verify(refreshToken, String(process.env.REFERSH_SECRET), (err, user) => {
            if (err)
                return res.sendStatus(403);
            delete user.iat;
            const accessToken = generateAccessToken(user);
            res.status(200).json({ accessToken: accessToken });
        });
    });
}
exports.refreshToken = refreshToken;
function deleteToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, user_service_1.removeJWTToken)(req.body.refreshToken);
        return res.sendStatus(204);
    });
}
exports.deleteToken = deleteToken;
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, String(process.env.JWT_SECRET), {
        expiresIn: 60 * 60,
    });
}
function generateRefreshToken(user) {
    return jsonwebtoken_1.default.sign(user, String(process.env.REFERSH_SECRET));
}
