import { Request, Response } from "express";
import { HttpException } from "../errors/HttpException";

import * as userService from "../services/userService";
import { IUser, IUserLogin } from "../types/User";

export const signup = async (req: Request, res: Response) => {
  const {email, password, confirmPassword} = req.body as IUser;
  
  if(!(email && password && confirmPassword)) 
    throw new HttpException('Invalid params', 400);

  await userService.signup(req.body);

  return res.sendStatus(201);
}

export const signin = async (req: Request, res: Response) =>  {
  const {email, password} = req.body as IUserLogin;

  if(!(email && password)) throw new HttpException('invalid params', 400);

  const token = await userService.signin(req.body);

  return res.status(200).send({ token });
}