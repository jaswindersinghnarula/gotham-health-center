import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerOptions from "./docs/swagger";
import cors from "cors";
import { RootRouter } from "./routes/root";
import { UserRouter } from "./user/user.router";
import bodyParser from "body-parser";
import { AppointmentRouter } from "./appointment/appointment.route";
import { AuthRouter } from "./auth/auth.route";

dotenv.config();

const app: Express = express();
const port: String | undefined = process.env.APP_PORT;
const host: String | undefined = process.env.APP_HOST;

// Register CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Documentation Setup
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const specs = swaggerJsdoc(swaggerOptions());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(bodyParser.json());

// Register Routes
app.use(AuthRouter);
app.use(RootRouter);
app.use("/user", UserRouter);
app.use("/appointment", AppointmentRouter);

// Start listening
app.listen(
  {
    port: port || 3000,
    host: host || "localhost",
  },
  () => {
    console.log(
      `⚡️[server]: Server is running at http://${host || "localhost"}:${
        port || 3000
      }`
    );
  }
);
