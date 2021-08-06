import Joi from "joi";
import { IUser } from "../types/User";


const userSchema = (data: IUser) => {
  return Joi.object({ 
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required(),
    confirmPassword: Joi.ref('password'),
  }).validate(data);
}

export default userSchema;