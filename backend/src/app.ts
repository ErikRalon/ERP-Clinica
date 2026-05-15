import express from 'express';
import cors from 'cors';
import pacienteRutas from './rutas/pacienteRutas';
import usuarioRutas from './rutas/usuarioRutas';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pacientes', pacienteRutas);
app.use('/api/usuarios', usuarioRutas);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API ERP Clínica funcionando' });
});

export default app;