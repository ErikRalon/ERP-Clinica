import { Request, Response } from 'express';
import prisma from '../prisma';

// POST /api/historias
export const crearHistoriaClinica = async (req: Request, res: Response) => {
  try {
    const {
      pacienteId,
      medicoId,
      motivoConsulta,
      sintomasPrincipales,
      diagnostico,
      tratamiento,
      observaciones,
      presionArterial,
      temperatura,
      peso,
      altura,
    } = req.body;

    if (!pacienteId || !medicoId || !motivoConsulta || !sintomasPrincipales || !diagnostico) {
      return res.status(400).json({
        error:
          'pacienteId, medicoId, motivoConsulta, sintomasPrincipales y diagnostico son obligatorios.',
      });
    }

    const historia = await prisma.historiaClinica.create({
      data: {
        pacienteId,
        medicoId,
        motivoConsulta,
        sintomasPrincipales,
        diagnostico,
        tratamiento,
        observaciones,
        presionArterial,
        temperatura,
        peso,
        altura,
        // fecha se pone sola con @default(now())
      },
    });

    return res.status(201).json(historia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la historia clínica.' });
  }
};

// GET /api/pacientes/:id/historias
export const obtenerHistoriasPorPaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const historias = await prisma.historiaClinica.findMany({
      where: { pacienteId: Number(id) },
      include: {
        medico: {
          include: { usuario: true },
        },
      },
      orderBy: { fecha: 'desc' },
    });

    return res.json(historias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las historias clínicas.' });
  }
};