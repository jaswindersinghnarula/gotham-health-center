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
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const UserController = __importStar(require("./user.controller"));
const auth_middleware_1 = require("../auth/auth.middleware");
exports.UserRouter = express_1.default.Router();
const roles = ["ADMIN", "DOCTOR", "PATIENT", "GUEST"];
const UserCreationValidation = [
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email can not be empty")
        .isEmail()
        .withMessage("Invalid Email.")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserController.getUserByEmail(value);
        if (user)
            throw new Error(`Account with email ${value} already exists.`);
    })),
    (0, express_validator_1.check)("firstName")
        .notEmpty()
        .withMessage("First name can Not be empty.")
        .isLength({ max: 50 })
        .withMessage("First name legnth can not exceed 50 characters."),
    (0, express_validator_1.check)("lastName")
        .optional()
        .isLength({ max: 50 })
        .withMessage("Last name legnth can not exceed 50 characters."),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("Password can not be empty.")
        .isLength({
        min: 8,
        max: 25,
    }),
    (0, express_validator_1.check)("role")
        .optional()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(yield roles.includes(value))) {
            throw new Error("Invalid role value.");
        }
    })),
];
const UserUpdateValidation = [
    (0, express_validator_1.check)("firstName")
        .isLength({ max: 50 })
        .withMessage("First name legnth can not exceed 50 characters."),
    (0, express_validator_1.check)("lastName")
        .isLength({ max: 50 })
        .withMessage("Last name legnth can not exceed 50 characters."),
    (0, express_validator_1.check)("password")
        .optional()
        .isLength({
        min: 8,
        max: 25,
    })
        .withMessage("Password must be between 8 to 25 characters long."),
    (0, express_validator_1.check)("role")
        .optional()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(yield roles.includes(value))) {
            throw new Error("Invalid role value.");
        }
    })),
];
// Create
exports.UserRouter.post("/", [auth_middleware_1.authenticateToken, auth_middleware_1.verifyAdmin, ...UserCreationValidation], UserController.addUser);
// Read All
exports.UserRouter.get("/", [auth_middleware_1.authenticateToken, auth_middleware_1.verifyAdmin], UserController.showUsers);
// Read by id
exports.UserRouter.get("/:id", [auth_middleware_1.authenticateToken, auth_middleware_1.verifyAdmin], UserController.getUserById);
// Update
exports.UserRouter.patch("/:id", [auth_middleware_1.authenticateToken, auth_middleware_1.verifyAdmin, ...UserUpdateValidation], UserController.editUser);
// Delete
exports.UserRouter.delete("/:id", [auth_middleware_1.authenticateToken, auth_middleware_1.verifyAdmin], UserController.removeUser);
