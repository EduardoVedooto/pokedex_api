import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableDescription1628262128107 implements MigrationInterface {
    name = 'nullableDescription1628262128107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ALTER COLUMN "description" DROP NOT NULL`);      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ALTER COLUMN "description" SET NOT NULL`);
    }

}
