import express from 'express';
import cors from 'cors';
import pacienteRutas from './rutas/pacienteRutas';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pacientes', pacienteRutas);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API ERP Clínica funcionando' });
});

export default app;