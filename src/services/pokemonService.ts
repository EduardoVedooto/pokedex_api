import { getRepository, Repository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import { HttpException } from "../errors/HttpException";

export const getAll = async (): Promise<Pokemon[]> => {
  const repository = getRepository(Pokemon);
  return await repository.find();
}

export const getOne = async (id:number): Promise<Pokemon> => {
  const repository = getRepository(Pokemon);

  await validateID(id, repository);

  return await repository.findOne({where: {id}});
}

export const addPokemon = async (id:number): Promise<void> => {
  const repository = getRepository(Pokemon);

  const isMyPokemon = await validateID(id, repository);

  if(isMyPokemon) return;
  
  await repository.update(id, { isMyPokemon: true });
}

export const removePokemon = async (id: number): Promise<void> => {
  const repository = getRepository(Pokemon);

  const isMyPokemon = await validateID(id, repository);

  if(!isMyPokemon) return;

  await repository.update(id, { isMyPokemon: false });
}

const validateID = async (id: number, repository: Repository<Pokemon>): Promise<boolean> => {
  const result = await repository.findOne({ where: { id } });
  if(!result) throw new HttpException(`ID doesn't match with any pokémon from database`, 400);
  return result.isMyPokemon;
}