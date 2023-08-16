-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `dni` INTEGER NOT NULL,
    `sexo` ENUM('M', 'F') NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `cargo` ENUM('MAESTRO_DE_GRADO', 'MAESTRO_A_CARGO_DE_DIRECCION', 'MAESTRO_ESPECIAL') NULL,
    `telefono` VARCHAR(191) NULL,
    `revista` ENUM('TITULAR', 'SUPLENTE', 'INTERINO') NULL,
    `antiguedadDocente` DATETIME(3) NULL,
    `antiguedadInstitucion` DATETIME(3) NULL,
    `observaciones` VARCHAR(191) NULL,
    `legajo` VARCHAR(191) NULL,
    `gradoEscolar` ENUM('JARDIN', 'PRIMER_GRADO', 'SEGUNDO_GRADO', 'TERCER_GRADO', 'CUARTO_GRADO', 'QUINTO_GRADO', 'SEXTO_GRADO', 'SEPTIMO_GRADO') NULL,
    `seccion` ENUM('SECCION_A', 'SECCION_B') NULL,
    `telefonoTutor` VARCHAR(191) NULL,
    `fechaIngreso` DATETIME(3) NULL,
    `pagoSeguroEscolar` BOOLEAN NULL,
    `fechaEgreso` DATETIME(3) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'ALUMNO', 'PROFESOR', 'PERSONAL') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuario_dni_key`(`dni`),
    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sugerencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('REPORTAR_UN_PROBLEMA_DEL_SECTOR', 'REPORTAR_UN_PROBLEMA_DE_LA_ESCUELA', 'REPORTAR_UN_PROBLEMA_GENERAL', 'REPORTAR_UN_PROBLEMA_PERSONAL', 'RECONOCIMIENTO_Y_FELICITACIONES', 'OTRO') NOT NULL,
    `texo` VARCHAR(191) NULL,
    `anonima` BOOLEAN NOT NULL DEFAULT true,
    `usuarioId` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NULL,
    `titulo` VARCHAR(191) NULL,
    `imagen` VARCHAR(191) NULL,
    `incidencia` BOOLEAN NOT NULL DEFAULT false,
    `archivo` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seccion` ENUM('SECCION_A', 'SECCION_B') NOT NULL,
    `modulo1` VARCHAR(191) NULL,
    `modulo2` VARCHAR(191) NULL,
    `modulo3` VARCHAR(191) NULL,
    `modulo4` VARCHAR(191) NULL,
    `modulo5` VARCHAR(191) NULL,
    `modulo6` VARCHAR(191) NULL,
    `jornadaSimpleExtendida` VARCHAR(191) NULL,
    `lunes` VARCHAR(191) NULL,
    `martes` VARCHAR(191) NULL,
    `miercoles` VARCHAR(191) NULL,
    `jueves` VARCHAR(191) NULL,
    `viernes` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `licencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `solicitanteId` INTEGER NOT NULL,
    `autorizanteId` INTEGER NULL,
    `fechaSolicitud` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dias` INTEGER NULL,
    `expira` DATETIME(3) NULL,
    `articulo` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu` VARCHAR(191) NULL,
    `ingredientes` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sugerencia` ADD CONSTRAINT `sugerencia_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `licencia` ADD CONSTRAINT `licencia_solicitanteId_fkey` FOREIGN KEY (`solicitanteId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `licencia` ADD CONSTRAINT `licencia_autorizanteId_fkey` FOREIGN KEY (`autorizanteId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
