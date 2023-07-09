"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const cors_1 = __importDefault(require("cors"));
const root_1 = require("./routes/root");
const user_router_1 = require("./user/user.router");
const body_parser_1 = __importDefault(require("body-parser"));
const appointment_route_1 = require("./appointment/appointment.route");
const auth_route_1 = require("./auth/auth.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.APP_PORT;
const host = process.env.APP_HOST;
// Register CORS
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
// Documentation Setup
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const specs = swaggerJsdoc((0, swagger_1.default)());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use(body_parser_1.default.json());
// Register Routes
app.use(auth_route_1.AuthRouter);
app.use(root_1.RootRouter);
app.use("/user", user_router_1.UserRouter);
app.use("/appointment", appointment_route_1.AppointmentRouter);
// Start listening
app.listen({
    port: port || 3000,
    host: host || "localhost",
}, () => {
    console.log(`⚡️[server]: Server is running at http://${host || "localhost"}:${port || 3000}`);
});
