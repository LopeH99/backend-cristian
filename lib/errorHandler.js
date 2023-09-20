import { Prisma } from "@prisma/client";

export default async function errorHandler(error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2000':
            return 'La consulta a la base de datos falló debido a un problema en la conexión.';
          case 'P2001':
            return 'No se pudo encontrar el registro solicitado en la base de datos.';
          case 'P2002':
            return 'Ya existe un registro con esta clave única en la base de datos.';
          case 'P2003':
            return 'Violación de restricción única.';
          case 'P2004':
            return 'Violación de restricción de integridad.';
          case 'P2005':
            return 'La base de datos rechazó la consulta debido a un valor inaceptable.';
          case 'P2006':
            return 'Falta una relación requerida en la consulta.';
          case 'P2007':
            return 'Violación de restricción de clave foránea.';
          case 'P2008':
            return 'Violación de restricción de tabla.';
          case 'P2009':
            return 'Violación de restricción de columna.';
          default:
            return 'Error desconocido de Prisma: ' + error.message;
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        if (error.code === 'P1012' && error.meta) {
          // Error de validación de Prisma con información detallada
          const { field, error: validationError } = error.meta;
          return `Error de validación en el campo '${field}': ${validationError}`;
        } else {
          return 'Error de validación de Prisma: ' + error.message;
        }
      } else {
        return 'Error inesperado: ' + error.message;
      }
}
