import { z } from "zod";

// Define un esquema para el modelo 'menu'
const menuSchema = z.object({
  menu: z.string().optional(),
  ingredientes: z.string().optional(),
  fecha: z.coerce.date(),
});

// Middleware para validar los datos de la solicitud al crear o actualizar un 'menu'
export function validateMenuCreateOrUpdate(req, res, next) {
  try {
    // Valida el cuerpo de la solicitud con el esquema
    menuSchema.parse(req.body);
    next(); // Los datos son válidos, continúa con el siguiente middleware
  } catch (error) {
    // Los datos no son válidos, devuelve una respuesta de error
    res
      .status(400)
      .json({
        error: "Datos no válidos para la creación o actualización de menú",
        detalles: error,
      });
  }
}
