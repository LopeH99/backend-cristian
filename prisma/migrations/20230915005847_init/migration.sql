-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('MAESTRO_DE_GRADO', 'MAESTRO_A_CARGO_DE_DIRECCION', 'MAESTRO_ESPECIAL');

-- CreateEnum
CREATE TYPE "Revista" AS ENUM ('TITULAR', 'SUPLENTE', 'INTERINO');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'ALUMNO', 'PROFESOR', 'PERSONAL');

-- CreateEnum
CREATE TYPE "GradoEscolar" AS ENUM ('JARDIN', 'PRIMER_GRADO', 'SEGUNDO_GRADO', 'TERCER_GRADO', 'CUARTO_GRADO', 'QUINTO_GRADO', 'SEXTO_GRADO', 'SEPTIMO_GRADO');

-- CreateEnum
CREATE TYPE "Seccion" AS ENUM ('SECCION_A', 'SECCION_B');

-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('REPORTAR_UN_PROBLEMA_DEL_SECTOR', 'REPORTAR_UN_PROBLEMA_DE_LA_ESCUELA', 'REPORTAR_UN_PROBLEMA_GENERAL', 'REPORTAR_UN_PROBLEMA_PERSONAL', 'RECONOCIMIENTO_Y_FELICITACIONES', 'OTRO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "cargo" "Cargo",
    "telefono" TEXT,
    "revista" "Revista",
    "antiguedadDocente" TIMESTAMP(3),
    "antiguedadInstitucion" TIMESTAMP(3),
    "observaciones" TEXT,
    "legajo" TEXT,
    "gradoEscolar" "GradoEscolar",
    "seccion" "Seccion",
    "telefonoTutor" TEXT,
    "fechaIngreso" TIMESTAMP(3),
    "pagoSeguroEscolar" BOOLEAN,
    "fechaEgreso" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sugerencia" (
    "id" SERIAL NOT NULL,
    "tipo" "Tipo" NOT NULL,
    "texo" TEXT,
    "anonima" BOOLEAN NOT NULL DEFAULT true,
    "usuarioId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sugerencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evento" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT,
    "titulo" TEXT,
    "novedad" BOOLEAN NOT NULL DEFAULT false,
    "incidencia" BOOLEAN NOT NULL DEFAULT false,
    "imagen" TEXT,
    "archivo" TEXT,
    "fecha" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horario" (
    "id" SERIAL NOT NULL,
    "seccion" "Seccion" NOT NULL,
    "gradoEscolar" "GradoEscolar",
    "modulo" TEXT,
    "rangoHorario" TEXT,
    "lunes" TEXT,
    "martes" TEXT,
    "miercoles" TEXT,
    "jueves" TEXT,
    "viernes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licencia" (
    "id" SERIAL NOT NULL,
    "solicitanteId" INTEGER NOT NULL,
    "autorizanteId" INTEGER,
    "fechaSolicitud" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dias" INTEGER,
    "expira" TIMESTAMP(3),
    "articulo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "licencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "menu" TEXT,
    "ingredientes" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_dni_key" ON "usuario"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "sugerencia" ADD CONSTRAINT "sugerencia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "licencia" ADD CONSTRAINT "licencia_solicitanteId_fkey" FOREIGN KEY ("solicitanteId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "licencia" ADD CONSTRAINT "licencia_autorizanteId_fkey" FOREIGN KEY ("autorizanteId") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
