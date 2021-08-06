import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import userLoginSchema from "../schemas/userLogin.schema";
import { HttpException } from "../errors/HttpException";
import { IUser, IUserLogin } from "../types/User";
import userSchema from "../schemas/user.schema";
import Session from "../entities/Session";
import User from "../entities/User";

export const signup = async (user: IUser): Promise<void> => {
  const validation = userSchema(user);
  if(validation.error) throw new HttpException(validation.error.details[0].message, 400);
  
  const repository = getRepository(User);
  
  const isExistent = await repository.findOne({where: {email: user.email}});
  if(isExistent) throw new HttpException('User already exists.', 409);

  repository.insert({
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
  });
}

export const signin = async (body: IUserLogin): Promise<string> => {
  const validation = userLoginSchema(body);
  if(validation.error) throw new HttpException(validation.error.details[0].message, 400);

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({where: {email: body.email}});
  if(!(user && bcrypt.compareSync(body.password, user.password))) 
    throw new HttpException("Email and/or password incorrects", 401);

  const sessionRepository = getRepository(Session);
  const token = uuid();

  await sessionRepository.insert({
    id: user.id,
    token,
  });

  return token;
}