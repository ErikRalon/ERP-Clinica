import { Router } from 'express';
import {
  crearCita,
  obtenerCitas,
  obtenerCita,
  actualizarEstadoCita,
} from '../controladores/citaControlador';

const router = Router();

router.post('/', crearCita);
router.get('/', obtenerCitas);
router.get('/:id', obtenerCita);
router.put('/:id/estado', actualizarEstadoCita);

export default router;