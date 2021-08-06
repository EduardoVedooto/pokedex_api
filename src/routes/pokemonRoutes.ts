import * as controller from "../controllers/pokemonController";
import { Router } from "express";
import authentication from "../middlewares/authentication";

const router = Router();

router.use(authentication);

router.get("/pokemons", controller.getAll);
router.get("/pokemons/:id", controller.getOne);
router.post("/my-pokemons/:id/add", controller.addPokemon);
router.post("/my-pokemons/:id/remove", controller.removePokemon);

export { router as pokemonRouter};