import { Request, Response } from 'express';
import prisma from '../prisma';

// Obtener todos los pacientes
export const obtenerPacientes = async (req: Request, res: Response) => {
  try {
    const pacientes = await prisma.paciente.findMany();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
};

// Obtener un paciente por ID
export const obtenerPaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const paciente = await prisma.paciente.findUnique({
      where: { id: Number(id) }
    });
    
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el paciente' });
  }
};

// Crear un nuevo paciente
export const crearPaciente = async (req: Request, res: Response) => {
  try {
    const paciente = await prisma.paciente.create({
      data: req.body
    });
    res.status(201).json(paciente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el paciente' });
  }
};

// Actualizar un paciente
export const actualizarPaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const paciente = await prisma.paciente.update({
      where: { id: Number(id) },
      data: req.body
    });
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el paciente' });
  }
};

// Eliminar un paciente
export const eliminarPaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.paciente.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el paciente' });
  }
};