import express from 'express';
import cors from 'cors';
import pacienteRutas from './rutas/pacienteRutas';
import usuarioRutas from './rutas/usuarioRutas';
import insumoRutas from './rutas/insumoRutas';
import consumoRutas from './rutas/consumoRutas';
import citaRutas from './rutas/citaRutas';
import historiaClinicaRutas from './rutas/historiaClinicaRutas';
import recetaRutas from './rutas/recetaRutas';
import facturaRutas from './rutas/facturaRutas';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pacientes', pacienteRutas);
app.use('/api/usuarios', usuarioRutas);
app.use('/api/insumos', insumoRutas);
app.use('/api/consumos', consumoRutas);
app.use('/api/citas', citaRutas);
app.use('/api/historias', historiaClinicaRutas);
app.use('/api/recetas', recetaRutas);
app.use('/api/facturas', facturaRutas);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API ERP Clínica funcionando' });
});

import loginRutas from './rutas/loginRutas';

app.use('/api/auth', loginRutas);

export default app;