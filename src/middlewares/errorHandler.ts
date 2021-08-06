import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response => {
  if(err.status) return res.status(err.status).send(err.message);
  else {
    console.error(err);
    return res.sendStatus(500);
  }
}

export default errorHandler;