import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Validar que vengan los dos campos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Formato de email inválido.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    // 2. Buscar usuario por email
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      // No hay usuario con ese email
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // 3. Comparar contraseña (por ahora texto plano)
    if (usuario.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // 4. Responder éxito (sin enviar el password)
    const { password: _, ...usuarioSinPassword } = usuario;

    return res.status(200).json({
      mensaje: 'Login correcto.',
      usuario: usuarioSinPassword,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el login.' });
  }
};