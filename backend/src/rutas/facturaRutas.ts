import { Router } from 'express';
import {
  crearFactura,
  obtenerFactura,
  pagarFactura,
} from '../controladores/facturaControlador';

const router = Router();

router.post('/', crearFactura);
router.get('/:id', obtenerFactura);
router.put('/:id/pagar', pagarFactura);

export default router;
