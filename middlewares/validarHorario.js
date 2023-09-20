import { z } from "zod";

// Define un esquema para el modelo 'horario'
const horarioSchema = z.object({
    seccion: z.enum(["SECCION_A", "SECCION_B"], { message: "La sección debe ser válida." }),
    gradoEscolar: z.enum([
      "JARDIN",
      "PRIMER_GRADO",
      "SEGUNDO_GRADO",
      "TERCER_GRADO",
      "CUARTO_GRADO",
      "QUINTO_GRADO",
      "SEXTO_GRADO",
      "SEPTIMO_GRADO",
    ]).optional(),
    modulo: z.string().optional(),
    rangoHorario: z.string().optional(),
    lunes: z.string().optional(),
    martes: z.string().optional(),
    miercoles: z.string().optional(),
    jueves: z.string().optional(),
    viernes: z.string().optional(),
  });
  
  // Middleware para validar los datos de la solicitud al crear o actualizar un 'horario'
  export function validateHorarioCreateOrUpdate(req, res, next) {
    try {
      // Valida el cuerpo de la solicitud con el esquema
      horarioSchema.parse(req.body);
      next(); // Los datos son válidos, continúa con el siguiente middleware
    } catch (error) {
      // Los datos no son válidos, devuelve una respuesta de error
      res.status(400).json({ error: "Datos no válidos para la creación o actualización de horario", detalles: error });
    }
  }