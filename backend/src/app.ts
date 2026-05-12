import express, { Application, Request, Response } from "express";
import cors from "cors";

const aplicacion: Application = express();

aplicacion.use(cors());
aplicacion.use(express.json());

aplicacion.get("/salud", (solicitud: Request, respuesta: Response) => {
  respuesta.status(200).json({
    exito: true,
    mensaje: "Backend ERP clínico funcionando correctamente"
  });
});

export default aplicacion;