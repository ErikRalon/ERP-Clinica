import { Router } from 'express';
import { login } from '../controladores/loginControlador';

const router = Router();

router.post('/login', login);

export default router;