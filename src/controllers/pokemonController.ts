import { Request, Response } from "express";
import { HttpException } from "../errors/HttpException";
import * as service from "../services/pokemonService";

export const getAll = async (req: Request, res: Response) => {
  const pokemons = await service.getAll();
  return res.status(200).send(pokemons);
}

export const addPokemon = async (req: Request, res: Response) => {
  if(!(req.params.id && Number(req.params.id)))
    throw new HttpException("ID must contains only numbers", 400);
  
  await service.addPokemon(Number(req.params.id));
  return res.sendStatus(200);
}