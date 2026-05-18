import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/consumos
export const crearConsumoInsumo = async (req: Request, res: Response) => {
  try {
    const { insumoId, pacienteId, usuarioId, cantidad } = req.body;

    // Validaciones básicas
    if (!insumoId || !pacienteId || !usuarioId || !cantidad) {
      return res.status(400).json({
        error: 'insumoId, pacienteId, usuarioId y cantidad son obligatorios.',
      });
    }

    if (cantidad <= 0) {
      return res.status(400).json({
        error: 'La cantidad debe ser mayor que cero.',
      });
    }

    // Verificar que existan insumo, paciente y usuario
    const [insumo, paciente, usuario] = await Promise.all([
      prisma.insumo.findUnique({ where: { id: insumoId } }),
      prisma.paciente.findUnique({ where: { id: pacienteId } }),
      prisma.usuario.findUnique({ where: { id: usuarioId } }),
    ]);

    if (!insumo) {
      return res.status(404).json({ error: 'Insumo no encontrado.' });
    }

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado.' });
    }

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario (médico) no encontrado.' });
    }

    // Crear el consumo
    const consumo = await prisma.consumoInsumo.create({
      data: {
        insumoId,
        pacienteId,
        usuarioId,
        cantidad,
        // fecha se pone por default en Prisma
      },
    });

    return res.status(201).json(consumo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al registrar consumo de insumo.' });
  }
};