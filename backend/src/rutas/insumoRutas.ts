import { Router } from 'express';
import { crearInsumo } from '../controladores/insumoControlador';

const router = Router();

router.post('/', crearInsumo);

export default router;