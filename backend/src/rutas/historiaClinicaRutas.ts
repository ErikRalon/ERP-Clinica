import { Router } from 'express';
import {
  crearHistoriaClinica,
  obtenerHistoriasPorPaciente,
} from '../controladores/historiaClinicaControlador';

const router = Router();

// crear una historia
router.post('/', crearHistoriaClinica);

// ver historias de un paciente
router.get('/paciente/:id', obtenerHistoriasPorPaciente);

export default router;