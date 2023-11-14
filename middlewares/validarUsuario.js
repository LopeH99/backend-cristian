import { z } from "zod"

// Define un esquema base para el modelo 'usuario' con mensajes personalizados
const usuarioSchema = z.object({
    nombre: z
      .string()
      .min(1, { message: "El nombre debe tener al menos 1 caracter." })
      .max(255, { message: "El nombre no debe exceder los 255 caracteres." }),
    apellido: z
      .string()
      .min(1, { message: "El apellido debe tener al menos 1 caracter." })
      .max(255, { message: "El apellido no debe exceder los 255 caracteres." }),
    dni: z.number().int(),
    sexo: z.enum(["M", "F"], { message: "El sexo debe ser 'M' o 'F'." }),
    fechaNacimiento: z
      .coerce
      .date()
      .min(new Date("1900-01-01"), { message: "La fecha de nacimiento debe ser posterior a 1900-01-01." })
      .optional(),
    cargo: z.enum([
      "MAESTRO_DE_GRADO",
      "MAESTRO_A_CARGO_DE_DIRECCION",
      "MAESTRO_ESPECIAL",
    ]).optional(),
    telefono: z.string().max(20, { message: "El teléfono no debe exceder los 20 caracteres." }).optional(),
    revista: z.enum(["TITULAR", "SUPLENTE", "INTERINO"]).optional(),
    antiguedadDocente: z.coerce.date({ message: "La fecha de antigüedad docente debe ser válida." }).optional(),
    antiguedadInstitucion: z.coerce.date({ message: "La fecha de antigüedad en la institución debe ser válida." }).optional(),
    observaciones: z
      .string()
      .max(1000, { message: "Las observaciones no deben exceder los 1000 caracteres." })
      .optional(),
    legajo: z.string().max(255, { message: "El legajo no debe exceder los 255 caracteres." }).optional(),
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
    seccion: z.enum(["SECCION_A", "SECCION_B"]).optional(),
    telefonoTutor: z.string().max(20, { message: "El teléfono del tutor no debe exceder los 20 caracteres." }).optional(),
    fechaIngreso: z.coerce.date({ message: "La fecha de ingreso debe ser válida." }).optional(),
    pagoSeguroEscolar: z.boolean().optional(),
    fechaEgreso: z.coerce.date({ message: "La fecha de egreso debe ser válida." }).optional(),
    email: z.string().email({ message: "El email debe ser válido." }).optional(),
    rol: z
      .enum(["ADMIN", "ALUMNO", "PROFESOR", "PERSONAL"], { message: "El rol debe ser 'ADMIN', 'ALUMNO', 'PROFESOR' o 'PERSONAL'." }).optional(),
  });
  
  // Middleware para validar los datos de la solicitud al crear un 'usuario'
  export function validarUsuarioCrear(req, res, next) {
    try {
      // Valida el cuerpo de la solicitud con el esquema
      usuarioSchema.parse(req.body);
      next(); // Los datos son válidos, continúa con el siguiente middleware
    } catch (error) {
        console.log(error)
      // Los datos no son válidos, devuelve una respuesta de error
      res.status(400).json({ error: "Datos no válidos para la creación de usuario", detalles: error });
    }
  }
  
  // Middleware para validar los datos de la solicitud al actualizar un 'usuario'
  export function validarUsuarioActualizar(req, res, next) {
    try {
      // Valida el cuerpo de la solicitud con el esquema
      usuarioSchema.partial().parse(req.body);
      next(); // Los datos son válidos, continúa con el siguiente middleware
    } catch (error) {
      // Los datos no son válidos, devuelve una respuesta de error
      res.status(400).json({ error: "Datos no válidos para la actualización de usuario", detalles: error });
    }
  }