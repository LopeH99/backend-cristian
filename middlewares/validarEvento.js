// Define un esquema para el modelo 'evento'
import {z} from "zod";

const eventoSchema = z.object({
    tipo: z.string().optional(),
    titulo: z.string().optional(),
    novedad: z.boolean().default(false),
    incidencia: z.boolean().default(false),
    fecha: z.coerce.date().optional(),
    descripcion: z.string().optional(),
  });
  
  // Middleware para validar los datos de la solicitud al crear o actualizar un 'evento'
  export function validateEventoCreateOrUpdate(req, res, next) {
    try {
      // Valida el cuerpo de la solicitud con el esquema
      eventoSchema.parse(req.body);
      next(); // Los datos son válidos, continúa con el siguiente middleware
    } catch (error) {
      // Los datos no son válidos, devuelve una respuesta de error
      res.status(400).json({ error: "Datos no válidos para la creación o actualización de evento", detalles: error });
    }
  }