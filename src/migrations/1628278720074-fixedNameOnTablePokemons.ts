import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedNameOnTablePokemons1628278720074 implements MigrationInterface {
    name = 'fixedNameOnTablePokemons1628278720074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" RENAME COLUMN "isMyPokemon" TO "inMyPokemons"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" RENAME COLUMN "inMyPokemons" TO "isMyPokemon"`);
    }

}
