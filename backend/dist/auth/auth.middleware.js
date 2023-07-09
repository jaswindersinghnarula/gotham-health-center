"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]);
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET), (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        else {
            req.body.user = user;
            next();
        }
    });
}
exports.authenticateToken = authenticateToken;
function verifyAdmin(req, res, next) {
    const user = req.body.user;
    if (user.role === "ADMIN") {
        next();
    }
    else {
        res.sendStatus(403);
    }
}
exports.verifyAdmin = verifyAdmin;
