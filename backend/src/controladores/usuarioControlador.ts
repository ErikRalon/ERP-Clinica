import { Request, Response } from 'express';
import { PrismaClient, Rol } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los usuarios
export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por id
export const obtenerUsuario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const usuario = await prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// Crear usuario
const esEmailValido = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const crearUsuario = async (req: Request, res: Response) => {
  console.log('entro a crear usuario')
  try {
    const { email, password, nombres, apellidos, telefono, rol } = req.body;

    if (!email || !esEmailValido(email)) {
         return res
            .status(400)
            .json({ error: 'El correo es obligatorio y debe tener un formato válido.' });
        }

    if (!password || password.length < 6) {
           return res
            .status(400)
            .json({ error: 'La contraseña es obligatoria y debe tener al menos 6 caracteres.' });
        }
       if (!nombres || !nombres.trim()) {
      return res
        .status(400)
        .json({ error: 'El nombre es obligatorio.' });
    }

    if (!apellidos || !apellidos.trim()) {
      return res
        .status(400)
        .json({ error: 'Los apellidos son obligatorios.' });
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res
        .status(400)
        .json({ error: 'El correo ya está registrado.' });
    }

    const usuario = await prisma.usuario.create({
      data: {
        email,
        password,          // luego aquí pondremos el hash
        nombres,
        apellidos,
        telefono,
        rol: rol as Rol,   // convertir string al enum
      },
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { email, password, nombres, apellidos, telefono, rol, activo} = req.body;

    if (email && !esEmailValido(email)) {
      return res
        .status(400)
        .json({ error: 'El correo debe tener un formato válido.' });
    }

    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    if (nombres && !nombres.trim()) {
      return res
        .status(400)
        .json({ error: 'El nombre no puede estar vacío.' });
    }

    if (apellidos && !apellidos.trim()) {
      return res
        .status(400)
        .json({ error: 'Los apellidos no pueden estar vacíos.' });
    }

     if (email) {
      const usuarioConMismoEmail = await prisma.usuario.findUnique({
        where: { email },
      });

      if (usuarioConMismoEmail && usuarioConMismoEmail.id !== id) {
        return res
          .status(400)
          .json({ error: 'El correo ya está registrado por otro usuario.' });
      }
    }
    

    const usuario = await prisma.usuario.update({
      where: { id },
      data: {
        email,
        nombres,
        apellidos,
        telefono,
        rol: rol as Rol,
        activo,
      },
    });

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.usuario.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};