import { z } from "zod"

// Define un esquema para el modelo 'sugerencia'
const sugerenciaSchema = z.object({
    tipo: z.enum([
      "REPORTAR_UN_PROBLEMA_DEL_SECTOR",
      "REPORTAR_UN_PROBLEMA_DE_LA_ESCUELA",
      "REPORTAR_UN_PROBLEMA_GENERAL",
      "REPORTAR_UN_PROBLEMA_PERSONAL",
      "RECONOCIMIENTO_Y_FELICITACIONES",
      "OTRO",
    ], { message: "El tipo debe ser válido." }),
    texo: z.string().max(1000, { message: "El texto no debe exceder los 1000 caracteres." }).optional(),
    anonima: z.boolean().default(true),
  });
  
  // Middleware para validar los datos de la solicitud al crear o actualizar una 'sugerencia'
  export function validateSugerenciaCreateOrUpdate(req, res, next) {
    try {
      // Valida el cuerpo de la solicitud con el esquema
      sugerenciaSchema.parse(req.body);
      next(); // Los datos son válidos, continúa con el siguiente middleware
    } catch (error) {
      // Los datos no son válidos, devuelve una respuesta de error
      res.status(400).json({ error: "Datos no válidos para la creación o actualización de sugerencia", detalles: error });
    }
  }