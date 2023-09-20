// services/prismaService.js
import { PrismaClient } from '@prisma/client';

let prisma;

if (!prisma) {
  prisma = new PrismaClient();
}

export default prisma;
