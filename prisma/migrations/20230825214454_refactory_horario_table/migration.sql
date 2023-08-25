/*
  Warnings:

  - You are about to drop the column `jornadaSimpleExtendida` on the `horario` table. All the data in the column will be lost.
  - You are about to drop the column `modulo1` on the `horario` table. All the data in the column will be lost.
  - You are about to drop the column `modulo2` on the `horario` table. All the data in the column will be lost.
  - You are about to drop the column `modulo3` on the `horario` table. All the data in the column will be lost.
  - You are about to drop the column `modulo4` on the `horario` table. All the data in the column will be lost.
  - You are about to drop the column `modulo5` on the `horario` table. All the data in the column will be lost.
  - You are about to drop the column `modulo6` on the `horario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `horario` DROP COLUMN `jornadaSimpleExtendida`,
    DROP COLUMN `modulo1`,
    DROP COLUMN `modulo2`,
    DROP COLUMN `modulo3`,
    DROP COLUMN `modulo4`,
    DROP COLUMN `modulo5`,
    DROP COLUMN `modulo6`,
    ADD COLUMN `gradoEscolar` ENUM('JARDIN', 'PRIMER_GRADO', 'SEGUNDO_GRADO', 'TERCER_GRADO', 'CUARTO_GRADO', 'QUINTO_GRADO', 'SEXTO_GRADO', 'SEPTIMO_GRADO') NULL,
    ADD COLUMN `modulo` VARCHAR(191) NULL,
    ADD COLUMN `rangoHorario` VARCHAR(191) NULL;
