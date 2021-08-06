import * as controller from "../controllers/pokemonController";
import { Router } from "express";
import authentication from "../middlewares/authentication";

const router = Router();

router.use(authentication);

router.get("/pokemons", controller.getAll);
router.post("/my-pokemons/:id/add", controller.addPokemon);

export { router as pokemonRouter};