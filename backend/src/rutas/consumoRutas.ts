import { Router } from 'express';
import { crearConsumoInsumo } from '../controladores/consumoControlador';

const router = Router();

router.post('/', crearConsumoInsumo);

export default router;