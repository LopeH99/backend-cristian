import jwt from 'jsonwebtoken';
import prisma from '../services/prismaService.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').split(" ").pop();
  if (!token) {
    return res.status(401).json({ error: 'Token no enviado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // busca en la BD el usuario
    const user = await prisma.usuario.findUnique({
      where: {
        id: userId,
      },
    });
    prisma.$disconnect;

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.authUser = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      rol: user.rol,
    };

    next(); // Continua con el siguiente middleware
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido' });
  }
};

export default authMiddleware;
