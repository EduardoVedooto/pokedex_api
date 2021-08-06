import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import Session from "../entities/Session";

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.header("Authorization");
  
  if(!auth) return res.sendStatus(401);
  
  const token = auth.split("Bearer ")[1];

  const repo = getRepository(Session);
  const session = await repo.findOne({ token });

  if(!session) return res.sendStatus(401);
  else next();
  
}

export default authentication;