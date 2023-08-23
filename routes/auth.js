import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../services/prismaService.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const usuario = await prisma.usuario.findUnique({
    where: {
      email,
    },
  });

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales Invalidas' });
  }

  const isPasswordValid = await bcrypt.compare(password, usuario.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Credenciales Invalidas' });
  }

  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
    expiresIn: '72h',
  });

  res.json({ token });
})

export default router;