import { Request, Response } from "express";
import { HttpException } from "../errors/HttpException";

import * as userService from "../services/userService";
import { IUser } from "../types/User";

export const signup = async (req: Request, res: Response) => {
  const {email, password, confirmPassword} = req.body as IUser;
  
  if(!(email && password && confirmPassword)) 
    throw new HttpException("Invalid params", 400);

  await userService.signup(req.body);

  return res.sendStatus(201);
}
