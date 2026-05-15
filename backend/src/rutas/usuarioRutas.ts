import { Router } from "express";
import {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario, 
    actualizarUsuario,
    eliminarUsuario,

} from '../controladores/usuarioControlador';

const router = Router();

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarios);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;