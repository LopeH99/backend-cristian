import { z } from "zod";

// Define un esquema para el modelo 'licencia'
const licenciaSchema = z.object({
  solicitanteId: z.coerce.number().int(),
  autorizanteId: z.coerce.number().int().optional(),
  fechaSolicitud: z.coerce.date().optional(),
  dias: z.coerce.number().int().optional(),
  expira: z.coerce.date().optional(),
  articulo: z.string(),
});

// Middleware para validar los datos de la solicitud al crear o actualizar una 'licencia'
export function validateLicenciaCreateOrUpdate(req, res, next) {
  try {
    // Valida el cuerpo de la solicitud con el esquema
    licenciaSchema.parse(req.body);
    next(); // Los datos son válidos, continúa con el siguiente middleware
  } catch (error) {
    // Los datos no son válidos, devuelve una respuesta de error
    res
      .status(400)
      .json({
        error: "Datos no válidos para la creación o actualización de licencia",
        detalles: error,
      });
  }
}
