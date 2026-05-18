import { Request, Response } from 'express';
import prisma from '../prisma';

// POST /api/citas  -> crear cita
export const crearCita = async (req: Request, res: Response) => {
  try {
    const {
      pacienteId,
      medicoId,
      fecha,
      horaInicio,
      horaFin,
      motivo,
      observaciones,
      creadaPorId,
    } = req.body;

    if (!pacienteId || !medicoId || !fecha || !horaInicio || !horaFin || !motivo || !creadaPorId) {
      return res.status(400).json({
        error: 'pacienteId, medicoId, fecha, horaInicio, horaFin, motivo y creadaPorId son obligatorios.',
      });
    }

    const cita = await prisma.cita.create({
      data: {
        pacienteId,
        medicoId,
        fecha: new Date(fecha),
        horaInicio,
        horaFin,
        motivo,
        observaciones,
        creadaPorId,
        // estado queda PENDIENTE por defecto en el schema
      },
    });

    return res.status(201).json(cita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la cita.' });
  }
};

// GET /api/citas -> listar citas
export const obtenerCitas = async (req: Request, res: Response) => {
  try {
    const citas = await prisma.cita.findMany({
      include: {
        paciente: true,
        medico: { include: { usuario: true } },
      },
    });
    return res.json(citas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las citas.' });
  }
};

// GET /api/citas/:id -> una cita
export const obtenerCita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cita = await prisma.cita.findUnique({
      where: { id: Number(id) },
      include: {
        paciente: true,
        medico: { include: { usuario: true } },
      },
    });

    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada.' });
    }

    return res.json(cita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener la cita.' });
  }
};

// PUT /api/citas/:id/estado -- actualizar estado
export const actualizarEstadoCita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // PENDIENTE, CONFIRMADA, EN_CURSO, COMPLETADA, CANCELADA, NO_ASISTIO

    if (!estado) {
      return res.status(400).json({ error: 'El estado es obligatorio.' });
    }

    const cita = await prisma.cita.update({
      where: { id: Number(id) },
      data: { estado },
    });

    return res.json(cita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar el estado de la cita.' });
  }
};