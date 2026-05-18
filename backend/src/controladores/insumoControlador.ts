import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const crearInsumo = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, farmaceutica, costoVenta, stockActual, unidad } = req.body;

    if (!nombre || !costoVenta || !unidad) {
      return res.status(400).json({
        error: 'nombre, costoVenta y unidad son obligatorios.',
      });
    }

    const insumo = await prisma.insumo.create({
      data: {
        nombre,
        descripcion,
        farmaceutica,
        costoVenta,
        stockActual: stockActual ?? 0,
        unidad,
        activo: true,
      },
    });

    return res.status(201).json(insumo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear insumo.' });
  }
};