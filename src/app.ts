import "./setup";
import 'express-async-errors';

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";
import { userRouter } from "./routes/userRoutes";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);

app.use(errorHandler);

export async function init () {
  await connectDatabase();
}


export default app;
