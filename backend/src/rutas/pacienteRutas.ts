import { Router } from 'express';
import {
  obtenerPacientes,
  obtenerPaciente,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente
} from '../controladores/pacienteControlador';

const router = Router();

// GET /api/pacientes - Obtener todos los pacientes
router.get('/', obtenerPacientes);

// GET /api/pacientes/:id - Obtener un paciente específico
router.get('/:id', obtenerPaciente);

// POST /api/pacientes - Crear nuevo paciente
router.post('/', crearPaciente);

// PUT /api/pacientes/:id - Actualizar paciente
router.put('/:id', actualizarPaciente);

// DELETE /api/pacientes/:id - Eliminar paciente
router.delete('/:id', eliminarPaciente);

export default router;