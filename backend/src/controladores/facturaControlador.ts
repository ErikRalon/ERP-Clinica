import { Request, Response } from 'express';
import prisma from '../prisma';

// POST /api/facturas
export const crearFactura = async (req: Request, res: Response) => {
  try {
    const {
      pacienteId,
      creadaPorId,
      descuento = 0,
      metodoPago,
      observaciones,
      detalles,
    } = req.body;

    if (!pacienteId || !creadaPorId || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        error: 'pacienteId, creadaPorId y al menos un detalle son obligatorios.',
      });
    }

    // calcular subtotal a partir de los detalles
    const subtotal = detalles.reduce(
      (acc: number, d: any) => acc + d.cantidad * d.precioUnitario,
      0
    );

    const total = subtotal - descuento;

    const factura = await prisma.factura.create({
      data: {
        pacienteId,
        creadaPorId,
        subtotal,
        descuento,
        total,
        metodoPago, // puede ser null si aún no se paga
        observaciones,
        detalles: {
          create: detalles.map((d: any) => ({
            concepto: d.concepto,
            cantidad: d.cantidad,
            precioUnitario: d.precioUnitario,
            subtotal: d.cantidad * d.precioUnitario,
            medicamentoId: d.medicamentoId ?? null,
          })),
        },
      },
      include: {
        detalles: true,
      },
    });

    return res.status(201).json(factura);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la factura.' });
  }
};

// GET /api/facturas/:id
export const obtenerFactura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const factura = await prisma.factura.findUnique({
      where: { id: Number(id) },
      include: {
        paciente: true,
        creadaPor: true,
        detalles: {
          include: {
            medicamento: true,
          },
        },
      },
    });

    if (!factura) {
      return res.status(404).json({ error: 'Factura no encontrada.' });
    }

    return res.json(factura);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener la factura.' });
  }
};

// PUT /api/facturas/:id/pagar
export const pagarFactura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { metodoPago } = req.body; // EFECTIVO, TARJETA, TRANSFERENCIA, SEGURO

    if (!metodoPago) {
      return res.status(400).json({ error: 'metodoPago es obligatorio para pagar la factura.' });
    }

    const factura = await prisma.factura.update({
      where: { id: Number(id) },
      data: {
        estado: 'PAGADA',
        metodoPago,
      },
      include: {
        detalles: true,
      },
    });

    return res.json(factura);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al pagar la factura.' });
  }
};