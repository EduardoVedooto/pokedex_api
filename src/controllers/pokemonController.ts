import { Request, Response } from "express";
import { HttpException } from "../errors/HttpException";
import * as service from "../services/pokemonService";

export const getAll = async (req: Request, res: Response) => {
  const pokemons = await service.getAll();
  return res.status(200).send(pokemons);
}

export const getOne = async (req: Request, res: Response) => {
  verifyID(req.params.id);
  
  const pokemon = await service.getOne(Number(req.params.id));
  return res.status(200).send(pokemon);
}

export const addPokemon = async (req: Request, res: Response) => {
  verifyID(req.params.id);
  
  await service.addPokemon(Number(req.params.id));
  return res.sendStatus(200);
}

export const removePokemon = async(req: Request, res: Response) => {
  verifyID(req.params.id);

  await service.removePokemon(Number(req.params.id));
  return res.sendStatus(200);
}

const verifyID = (id:string) => {
  if(!(id && Number(id)))
    throw new HttpException("ID must contains only numbers", 400);
}