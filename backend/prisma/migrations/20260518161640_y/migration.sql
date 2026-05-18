/*
  Warnings:

  - You are about to drop the `Hospitalizacion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hospitalizacion" DROP CONSTRAINT "Hospitalizacion_pacienteId_fkey";

-- DropTable
DROP TABLE "Hospitalizacion";

-- DropEnum
DROP TYPE "EstadoHospitalizacion";

-- CreateTable
CREATE TABLE "Insumo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "farmaceutica" TEXT,
    "costoVenta" DOUBLE PRECISION NOT NULL,
    "stockActual" INTEGER NOT NULL DEFAULT 0,
    "unidad" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Insumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumoInsumo" (
    "id" SERIAL NOT NULL,
    "insumoId" INTEGER NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsumoInsumo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConsumoInsumo" ADD CONSTRAINT "ConsumoInsumo_insumoId_fkey" FOREIGN KEY ("insumoId") REFERENCES "Insumo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumoInsumo" ADD CONSTRAINT "ConsumoInsumo_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumoInsumo" ADD CONSTRAINT "ConsumoInsumo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
