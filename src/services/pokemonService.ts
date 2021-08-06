import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";

export const getAll = async () => {
  const repository = getRepository(Pokemon);
  return await repository.find();
}