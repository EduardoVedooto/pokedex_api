import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import { HttpException } from "../errors/HttpException";

export const getAll = async () => {
  const repository = getRepository(Pokemon);
  return await repository.find();
}

export const addPokemon = async (id:number) => {
  const repository = getRepository(Pokemon);

  const result = await repository.findOne({where: {id}});
  if(!result) throw new HttpException("ID doesn't match with any pokémon from database", 400);
  if(result.isMyPokemon) return;
  
  await repository.update(id,{isMyPokemon: true});
}