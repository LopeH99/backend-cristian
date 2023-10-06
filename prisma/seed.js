import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash("1234", 10);

  await prisma.usuario.create({
    data: {
      nombre: "admin",
      apellido: "admin",
      dni: 1111111,
      email: "admin@tesis.com",
      password: hashedPassword,
      rol: "ADMIN",
      sexo: "M",
      fechaNacimiento: new Date("1989-01-01"),
    },
  });

  const userData = [
    // Datos de Profesores
    {
      nombre: "Juan",
      apellido: "López",
      dni: 12345678,
      email: "juan.lopez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("1980-05-15"),
    },
    {
      nombre: "María",
      apellido: "Gómez",
      dni: 23456789,
      email: "maria.gomez@example.com",
      sexo: "F",
      fechaNacimiento: new Date("1975-12-10"),
    },
    {
      nombre: "Pedro",
      apellido: "Martínez",
      dni: 34567890,
      email: "pedro.martinez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("1988-03-20"),
    },
    {
      nombre: "Ana",
      apellido: "Pérez",
      dni: 45678901,
      email: "ana.perez@example.com",
      sexo: "F",
      fechaNacimiento: new Date("1983-08-05"),
    },
    {
      nombre: "Carlos",
      apellido: "Rodríguez",
      dni: 56789012,
      email: "carlos.rodriguez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("1979-11-25"),
    },

    // Datos de Alumnos (menores de 18)
    {
      nombre: "Luis",
      apellido: "Sánchez",
      dni: 67890123,
      email: "luis.sanchez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("2007-02-10"),
    },
    {
      nombre: "Laura",
      apellido: "Fernández",
      dni: 78901234,
      email: "laura.fernandez@example.com",
      sexo: "F",
      fechaNacimiento: new Date("2006-07-15"),
    },
    {
      nombre: "Diego",
      apellido: "García",
      dni: 89012345,
      email: "diego.garcia@example.com",
      sexo: "M",
      fechaNacimiento: new Date("2008-04-30"),
    },
    {
      nombre: "Sofía",
      apellido: "López",
      dni: 90123456,
      email: "sofia.lopez@example.com",
      sexo: "F",
      fechaNacimiento: new Date("2009-09-20"),
    },
    {
      nombre: "Martín",
      apellido: "Hernández",
      dni: 12234567,
      email: "martin.hernandez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("2010-12-05"),
    },
    {
      nombre: "Ana",
      apellido: "Martínez",
      dni: 12341234,
      email: "ana.martinez@example.com",
      sexo: "F",
      fechaNacimiento: new Date("2005-03-10"),
    },
    {
      nombre: "Hugo",
      apellido: "Pérez",
      dni: 23452345,
      email: "hugo.perez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("2006-11-25"),
    },
    {
      nombre: "Carla",
      apellido: "González",
      dni: 34563456,
      email: "carla.gonzalez@example.com",
      sexo: "F",
      fechaNacimiento: new Date("2008-09-15"),
    },
    {
      nombre: "Andrés",
      apellido: "López",
      dni: 45674567,
      email: "andres.lopez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("2007-04-20"),
    },
    {
      nombre: "Lucía",
      apellido: "Ramírez",
      dni: 56785678,
      email: "lucia.ramirez@example.com",
      sexo: "F",
      fechaNacimiento: new Date("2006-06-05"),
    },
    {
      nombre: "Miguel",
      apellido: "Fernández",
      dni: 67896789,
      email: "miguel.fernandez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("2009-12-12"),
    },
    {
      nombre: "Valeria",
      apellido: "García",
      dni: 78907890,
      email: "valeria.garcia@example.com",
      sexo: "F",
      fechaNacimiento: new Date("2007-08-30"),
    },
    {
      nombre: "Javier",
      apellido: "Sánchez",
      dni: 89018901,
      email: "javier.sanchez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("2010-02-28"),
    },
    {
      nombre: "María",
      apellido: "Torres",
      dni: 90129012,
      email: "maria.torres@example.com",
      sexo: "F",
      fechaNacimiento: new Date("2010-05-17"),
    },
    {
      nombre: "Felipe",
      apellido: "Hernández",
      dni: 12130123,
      email: "felipe.hernandez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("2008-10-08"),
    },
    {
      nombre: "Laura",
      apellido: "Pérez",
      dni: 11241234,
      email: "laura.perez@example.com",
      sexo: "F",
      fechaNacimiento: new Date("2009-01-04"),
    },
    {
      nombre: "Andrés",
      apellido: "Gómez",
      dni: 22352345,
      email: "andres.gomez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("2010-03-23"),
    },
    {
      nombre: "Ana",
      apellido: "Martínez",
      dni: 33463456,
      email: "ana.martinez2@example.com",
      sexo: "F",
      fechaNacimiento: new Date("2007-07-12"),
    },
    {
      nombre: "Hugo",
      apellido: "López",
      dni: 44574567,
      email: "hugo.lopez2@example.com",
      sexo: "M",
      fechaNacimiento: new Date("2009-09-26"),
    },
    {
      nombre: "Carla",
      apellido: "Ramírez",
      dni: 55685678,
      email: "carla.ramirez2@example.com",
      sexo: "F",
      fechaNacimiento: new Date("2010-01-14"),
    },

    // Datos de Personal
    {
      nombre: "Jorge",
      apellido: "Ramírez",
      dni: 11223344,
      email: "jorge.ramirez@example.com",
      sexo: "M",
      fechaNacimiento: new Date("1985-06-30"),
    },
    {
      nombre: "Laura",
      apellido: "Torres",
      dni: 22334455,
      email: "laura.torres@example.com",
      sexo: "F",
      fechaNacimiento: new Date("1990-04-15"),
    },
  ];

  // Crear alumnos
  const roles = ["ALUMNO", "PROFESOR", "PERSONAL"];
  for (let i = 0; i < 5; i++) {
    const role = "PROFESOR";
    const user = userData[i];
    const fechaIngreso = new Date(
      user.fechaNacimiento.getTime() +
        Math.floor(Math.random() * (new Date() - user.fechaNacimiento))
    );
    const telefono = `387-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const cargo = [
      "MAESTRO_DE_GRADO",
      "MAESTRO_A_CARGO_DE_DIRECCION",
      "MAESTRO_ESPECIAL",
    ][Math.floor(Math.random() * 3)];
    const seccion = Math.random() < 0.5 ? "SECCION_A" : "SECCION_B";
    const legajo = Math.floor(Math.random() * 20) + 1;
    await prisma.usuario.create({
      data: {
        nombre: user.nombre,
        apellido: user.apellido,
        dni: user.dni,
        email: user.email,
        password: hashedPassword,
        rol: role,
        sexo: user.sexo,
        fechaIngreso,
        telefono,
        cargo,
        legajo: legajo.toString(),
        seccion,
        antiguedadDocente: new Date("2000-05-15"),
        fechaNacimiento: user.fechaNacimiento,
      },
    });
  }

  for (let i = 5; i < 25; i++) {
    const role = "ALUMNO";
    const user = userData[i];
    const pagoSeguroEscolar = Math.random() < 0.5;
    const fechaIngreso = new Date(
      user.fechaNacimiento.getTime() +
        Math.floor(Math.random() * (new Date() - user.fechaNacimiento))
    );
    const telefonoTutor = `387-${Math.floor(
      10000000 + Math.random() * 90000000
    )}`;
    const seccion = Math.random() < 0.5 ? "SECCION_A" : "SECCION_B";
    const gradoEscolar = [
      "JARDIN",
      "PRIMER_GRADO",
      "SEGUNDO_GRADO",
      "TERCER_GRADO",
      "CUARTO_GRADO",
      "QUINTO_GRADO",
      "SEXTO_GRADO",
      "SEPTIMO_GRADO",
    ][Math.floor(Math.random() * 8)];
    let fechaEgreso = null;
    if (gradoEscolar === "SEPTIMO_GRADO" && Math.random() < 0.5) {
      fechaEgreso = new Date(
        user.fechaNacimiento.getTime() +
          Math.floor(Math.random() * (new Date() - user.fechaNacimiento))
      );
      while (fechaEgreso <= user.fechaNacimiento) {
        fechaEgreso = new Date(
          user.fechaNacimiento.getTime() +
            Math.floor(Math.random() * (new Date() - user.fechaNacimiento))
        );
      }
    }

    await prisma.usuario.create({
      data: {
        nombre: user.nombre,
        apellido: user.apellido,
        dni: user.dni,
        email: user.email,
        password: hashedPassword,
        rol: role,
        sexo: user.sexo,
        fechaNacimiento: user.fechaNacimiento,
        pagoSeguroEscolar,
        fechaIngreso,
        telefonoTutor,
        seccion,
        gradoEscolar,
        fechaEgreso,
      },
    });
  }

  for (let i = 25; i < 27; i++) {
    const role = "PERSONAL";
    const user = userData[i];
    await prisma.usuario.create({
      data: {
        nombre: user.nombre,
        apellido: user.apellido,
        dni: user.dni,
        email: user.email,
        password: hashedPassword,
        rol: role,
        sexo: user.sexo,
        fechaNacimiento: user.fechaNacimiento,
      },
    });
  }

  for (let i = 0; i < 5; i++) {
    await prisma.horario.create({
      data: {
        seccion: "SECCION_A",
        gradoEscolar: "QUINTO_GRADO",
        modulo: `Modulo ${i + 1}`,
        rangoHorario: `8:00hs a 8:40hs`,
        lunes: `Materia Lunes ${i + 1}`,
        martes: `Materia Martes ${i + 1}`,
        miercoles: `Materia Miércoles ${i + 1}`,
        jueves: `Materia Jueves ${i + 1}`,
        viernes: `Materia Viernes ${i + 1}`,
      },
    });
  }

  const sugerencias = [
    {
      tipo: "RECONOCIMIENTO_Y_FELICITACIONES",
      texo: "Quiero agradecer al personal de maestranza su labor diario para con la limpieza del patio trasero, ya que su accionar genera que no haya animales ni insectos peligrosos.",
      anonima: true,
    },
    {
      tipo: "REPORTAR_UN_PROBLEMA_DE_LA_ESCUELA",
      texo: "No hay papel en el baño de profesores",
      anonima: true,
    },
    {
      tipo: "OTRO",
      texo: "Sugiero gestionar una salida al museo general de artes de Salta capital",
      anonima: true,
    },
    {
      tipo: "REPORTAR_UN_PROBLEMA_PERSONAL",
      texo: "El aire acondicionado de mi aula no funciona adecuadamente",
      anonima: true,
    },
    {
      tipo: "RECONOCIMIENTO_Y_FELICITACIONES",
      texo: "Deseo felicitar al profesor de matemáticas por su excelente enseñanza",
      anonima: false,
      usuarioId: 2,
    },
    {
      tipo: "REPORTAR_UN_PROBLEMA_GENERAL",
      texo: "La iluminación en el pasillo principal es insuficiente en las noches",
      anonima: true,
    },
    {
      tipo: "OTRO",
      texo: "Propongo organizar una actividad de limpieza en el sector de juegos",
      anonima: true,
    },
  ];

  const licencias = [
    {
      solicitanteId: 1,
      autorizanteId: 1,
      dias: 5,
      articulo: "Artículo 1 - Descanso por enfermedad",
    },
    {
      solicitanteId: 2,
      autorizanteId: 1,
      dias: 3,
      articulo: "Artículo 2 - Licencia por motivos personales",
    },
    {
      solicitanteId: 3,
      autorizanteId: 1,
      dias: 7,
      articulo: "Artículo 3 - Licencia por asuntos familiares",
    },
    {
      solicitanteId: 4,
      autorizanteId: 1,
      dias: 2,
      articulo: "Artículo 4 - Licencia por formación profesional",
    },
    {
      solicitanteId: 5,
      autorizanteId: 1,
      dias: 4,
      articulo: "Artículo 5 - Licencia por maternidad/paternidad",
    },
    {
      solicitanteId: 6,
      autorizanteId: 1,
      dias: 6,
      articulo: "Artículo 6 - Licencia por mudanza",
    },
    {
      solicitanteId: 7,
      autorizanteId: 1,
      dias: 1,
      articulo: "Artículo 7 - Licencia por duelo",
    },
  ];

  const eventos = [
    {
      tipo: "Donación",
      titulo: "DONACIÓN",
      novedad: true,
      incidencia: false,
      fecha: new Date("2023-10-03"),
      descripcion:
        "En el día 3 de octubre de 2023, el señor intendente de la localidad, el licenciado Mario Alberto Kempes, se acercó hasta nuestra institución con la intención de realizar una donación de productos alimenticios destinados al comedor y a la posterior entrega a los alumnos de la institución.",
      imagen: "/uploads/imagen_1.png",
    },
    {
      tipo: "Salida escolar",
      titulo: "SALIDA AL COMPLEJO MUNICIPAL",
      novedad: true,
      incidencia: false,
      fecha: new Date("2023-11-06"),
      descripcion:
        "En el día 6 de noviembre de 2023, la sección de alumnos denominada A salió a modo de visita escolar hacia el complejo municipal con la intención de realizar una observación de la flora y fauna del mismo. Dicha excursión se realizó bajo la responsabilidad del profesor Raimundo Cuellar.",
    },
    {
      tipo: "Taller",
      titulo: "TALLER DE ARTE",
      novedad: true,
      incidencia: false,
      fecha: new Date("2023-12-15"),
      descripcion:
        "El próximo 15 de diciembre de 2023, se llevará a cabo un taller de arte en nuestra escuela primaria rural. Los estudiantes tendrán la oportunidad de expresar su creatividad a través de diversas actividades artísticas.",
    },
    {
      tipo: "Conferencia",
      titulo: "CONFERENCIA SOBRE EL MEDIO AMBIENTE",
      novedad: true,
      incidencia: false,
      fecha: new Date("2024-02-20"),
      descripcion:
        "El 20 de febrero de 2024, se realizará una conferencia en nuestra escuela rural para concienciar a los alumnos sobre la importancia de cuidar el medio ambiente. Expertos locales compartirán sus conocimientos.",
    },
    {
      tipo: "Actividad deportiva",
      titulo: "TORNEO DEPORTIVO INTERESCOLAR",
      novedad: true,
      incidencia: false,
      fecha: new Date("2024-04-10"),
      descripcion:
        "El 10 de abril de 2024, se llevará a cabo un torneo deportivo inter-escolar en el que nuestros alumnos competirán en diversas disciplinas deportivas.",
    },
    {
      tipo: "Celebración",
      titulo: "DÍA DE LA AMISTAD",
      novedad: true,
      incidencia: false,
      fecha: new Date("2024-07-20"),
      descripcion:
        "El 20 de julio de 2024, celebraremos el Día de la Amistad en nuestra escuela primaria rural. Los alumnos participarán en actividades que fomenten la amistad y el compañerismo.",
    },
    {
      tipo: "Excursión",
      titulo: "VISITA AL BOSQUE LOCAL",
      novedad: true,
      incidencia: false,
      fecha: new Date("2024-09-05"),
      descripcion:
        "El 5 de septiembre de 2024, los estudiantes de nuestra escuela realizarán una emocionante excursión al bosque local para aprender sobre la naturaleza y el ecosistema de la zona.",
    },
  ];

  const incidencias = [
    {
      titulo: "VENTILADOR ESTROPEADO",
      novedad: false,
      incidencia: true,
      fecha: new Date("2023-11-07"),
      descripcion:
        "En el día 7 de noviembre de 2023, los alumnos de la sección A, mediante juegos bruscos, deterioraron el ventilador del aula correspondiente a dicha sección. Los padres y/o tutores de los alumnos fueron notificados a dirección para el día 8 de noviembre del 2023.",
    },
    {
      titulo: "ALUMNO LESIONADO EN EDUCACIÓN FÍSICA",
      novedad: false,
      incidencia: true,
      fecha: new Date("2023-11-18"),
      descripcion:
        "En el día 18 de noviembre del 2023, en el transcurso de la clase de educación física a cargo del profesor Rivera Carlos, el alumno Samudio Claudio sufrió una lesión en su rodilla realizando una de las prácticas de la clase. El niño fue derivado a la clínica de la municipalidad y los tutores fueron informados.",
    },
    {
      titulo: "Daño en el Patio de Juegos",
      novedad: false,
      incidencia: true,
      fecha: new Date("2023-12-05"),
      descripcion:
        "El 5 de diciembre de 2023, se reportó un daño significativo en el patio de juegos de la escuela rural debido a un juego descuidado por parte de los alumnos. Se llevarán a cabo reparaciones necesarias.",
    },
    {
      titulo: "Inasistencia del Profesor de Matemáticas",
      novedad: false,
      incidencia: true,
      fecha: new Date("2024-01-15"),
      descripcion:
        "El 15 de enero de 2024, el profesor de matemáticas no pudo asistir a la escuela debido a razones de salud. Se tomarán medidas para cubrir sus clases durante su ausencia.",
    },
    {
      titulo: "Rotura de Ventanas por Tormenta",
      novedad: false,
      incidencia: true,
      fecha: new Date("2024-03-02"),
      descripcion:
        "El 2 de marzo de 2024, una fuerte tormenta causó la rotura de varias ventanas en la escuela rural. Se solicitarán reparaciones urgentes para garantizar la seguridad de los alumnos.",
    },
    {
      titulo: "Fuga de Agua en Baños",
      novedad: false,
      incidencia: true,
      fecha: new Date("2024-04-20"),
      descripcion:
        "El 20 de abril de 2024, se detectó una fuga de agua en los baños de la escuela, lo que requiere una reparación inmediata para evitar desperdicio de agua y daños adicionales.",
    },
    {
      titulo: "Problema en el Transporte Escolar",
      novedad: false,
      incidencia: true,
      fecha: new Date("2024-06-10"),
      descripcion:
        "El 10 de junio de 2024, se produjo un problema en el transporte escolar que afectó la llegada de los estudiantes. Los padres y tutores han sido notificados para coordinar soluciones temporales.",
    },
  ];

  // Cargar sugerencias
  for (const sugerencia of sugerencias) {
    await prisma.sugerencia.create({ data: sugerencia });
  }

  // Cargar licencias
  for (const licencia of licencias) {
    await prisma.licencia.create({ data: licencia });
  }

  // Cargar eventos
  for (const evento of eventos) {
    await prisma.evento.create({ data: evento });
  }

  // Cargar incidencias
  for (const incidencia of incidencias) {
    await prisma.evento.create({ data: incidencia });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
