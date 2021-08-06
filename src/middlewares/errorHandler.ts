import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response => {
  console.error(err);
  return res.status(err.status).send(err.message);
}

export default errorHandler;