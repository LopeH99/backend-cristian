import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()
async function main() {
    const hashedPassword = await bcrypt.hash('1234', 10);

    await prisma.usuario.create({
      data: {
        nombre: 'admin',
        apellido: 'admin',
        dni: 1111111,
        email: 'admin@tesis.com',
        password: hashedPassword,
        rol: 'ADMIN',
        sexo: 'M',
        fechaNacimiento: new Date("1989-01-01")
      },
    });

     // Create other users with different roles
  const roles = ['ALUMNO', 'PROFESOR', 'PERSONAL'];
  for (let i = 1; i <= 10; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const randomDNI = Math.floor(10000000 + Math.random() * 90000000); // Genera un número aleatorio de 8 dígitos
    await prisma.usuario.create({
      data: {
        nombre: `user${i}`,
        apellido: `apellido${i}`,
        dni: randomDNI,
        email: `user${i}@tesis.com`,
        password: hashedPassword,
        rol: role,
        sexo: 'M',
        fechaNacimiento: new Date("1990-01-01")
      },
    });
  }

  // Create records in other tables
  for (let i = 0; i < 5; i++) {
    await prisma.sugerencia.create({
      data: {
        tipo: 'OTRO',
        texo: `Sugerencia ${i}`,
        anonima: true,
        usuarioId: i + 1
      }
    });

    await prisma.evento.create({
      data: {
        tipo: 'EVENTO',
        titulo: `Evento ${i}`,
        novedad: false,
        incidencia: false
      }
    });

    await prisma.licencia.create({
      data: {
        solicitanteId: i + 1,
        dias: 5,
        articulo: `Artículo ${i}`
      }
    });

    await prisma.horario.create({
      data: {
        seccion: 'SECCION_A',
        gradoEscolar: 'QUINTO_GRADO',
        modulo: `Modulo ${i + 1}`,
        rangoHorario: `8:00hs a 8:40hs`,
        lunes: `Materia Lunes ${i + 1}`,
        martes: `Materia Martes ${i + 1}`,
        miercoles: `Materia Miércoles ${i + 1}`,
        jueves: `Materia Jueves ${i + 1}`,
        viernes: `Materia Viernes ${i + 1}`
      }
    });
  }
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })