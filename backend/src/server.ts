import dotenv from "dotenv";
import aplicacion from "./app";

dotenv.config();

const puerto = Number(process.env.PUERTO) || 3000;

aplicacion.listen(puerto, () => {
  console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});