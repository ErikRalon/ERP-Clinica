import { Request, Response } from 'express';
import prisma from '../prisma';

// POST /api/recetas
export const crearReceta = async (req: Request, res: Response) => {
  try {
    const {
      historiaClinicaId,
      medicoId,
      indicaciones,
      vigencia,
      detalles,
    } = req.body;

    if (!historiaClinicaId || !medicoId || !indicaciones || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        error: 'historiaClinicaId, medicoId, indicaciones y al menos un detalle son obligatorios.',
      });
    }

    // Validar que existan historia y médico
    const [historia, medico] = await Promise.all([
      prisma.historiaClinica.findUnique({ where: { id: Number(historiaClinicaId) } }),
      prisma.medico.findUnique({ where: { id: Number(medicoId) } }),
    ]);

    if (!historia) {
      return res.status(404).json({ error: 'Historia clínica no encontrada.' });
    }

    if (!medico) {
      return res.status(404).json({ error: 'Médico no encontrado.' });
    }

    // Crear receta con detalles en una sola operación
    const receta = await prisma.receta.create({
      data: {
        historiaClinicaId,
        medicoId,
        indicaciones,
        vigencia: vigencia ? new Date(vigencia) : null,
        detalles: {
          create: detalles.map((d: any) => ({
            medicamentoId: d.medicamentoId,
            dosis: d.dosis,
            frecuencia: d.frecuencia,
            duracion: d.duracion,
          })),
        },
      },
      include: {
        detalles: true,
      },
    });

    return res.status(201).json(receta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la receta.' });
  }
};

// GET /api/recetas/:id
export const obtenerReceta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const receta = await prisma.receta.findUnique({
      where: { id: Number(id) },
      include: {
        medico: {
          include: { usuario: true },
        },
        historiaClinica: {
          include: {
            paciente: true,
          },
        },
        detalles: {
          include: {
            medicamento: true,
          },
        },
      },
    });

    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada.' });
    }

    return res.json(receta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener la receta.' });
  }
};