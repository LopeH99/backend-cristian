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