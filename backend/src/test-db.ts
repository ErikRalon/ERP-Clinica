import prisma from './prisma';

async function testDatabase() {
  try {
    console.log('Probando conexión a la base de datos...');
    
    // Crear un paciente de prueba
    const paciente = await prisma.paciente.create({
      data: {
        nombres: "Juan Carlos",
        apellidos: "Pérez García",
        dpi: "1234567890101",
        fechaNacimiento: new Date("1990-05-15"),
        telefono: "12345678",
        email: "juan@ejemplo.com",
        direccion: "Zona 10, Ciudad de Guatemala"
      }
    });

    console.log('Paciente creado exitosamente:');
    console.log(paciente);

    // Consultar todos los pacientes
    const pacientes = await prisma.paciente.findMany();
    console.log(`Total de pacientes en la BD: ${pacientes.length}`);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error:', error);
    await prisma.$disconnect();
  }
}

testDatabase();