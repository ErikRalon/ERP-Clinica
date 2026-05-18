import { Router } from 'express';
import { crearReceta, obtenerReceta } from '../controladores/recetaControlador';

const router = Router();

router.post('/', crearReceta);
router.get('/:id', obtenerReceta);

export default router;