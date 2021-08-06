import { Request, Response } from "express";
import * as service from "../services/pokemonService";

export const getAll = async (req: Request, res: Response) => {
  const pokemons = await service.getAll();
  return res.status(200).send(pokemons);
}