
// server/config/seed.js
// Crea usuarios, médicos, pacientes, especialidades, turnos, etc
// Facilita enormemente el testing porque todos trabajamos sobre los mismos datos

// Crea usuarios, médicos, pacientes, especialidades, turnos, etc
// Facilita enormemente el testing porque todos trabajamos sobre los mismos datos

// Importar modelos registrados en Mongoose
import { EspecialidadModel } from "../models/EspecialidadModel.js";
import { MedicoModel } from "../models/MedicoModel.js";
import { NotificacionModel } from "../models/NotificacionModel.js";
import { PacienteModel } from "../models/PacienteModel.js";
import { PracticaModel } from "../models/PracticaModel.js";
import { SedeModel } from "../models/SedeModel.js";
import { TurnoModel } from "../models/TurnoModel.js";
import { UsuarioModel } from "../models/UsuarioModel.js";
import { PlanModel } from "../models/PlanModel.js";
import dotenv from "dotenv";
dotenv.config();

export const runSeed = async () => {
  try {
    console.log("🌱 Iniciando Seed Determinista con Planes...");

    // =========================================================================
    // 0. LIMPIAR COLECCIONES (orden correcto para evitar referencias rotas)
    // =========================================================================
    console.log("🧹 Limpiando colecciones...");
    await TurnoModel.deleteMany({});
    await NotificacionModel.deleteMany({});
    await PacienteModel.deleteMany({});
    await MedicoModel.deleteMany({});
    await PlanModel.deleteMany({});
    await PracticaModel.deleteMany({});
    await EspecialidadModel.deleteMany({});
    await SedeModel.deleteMany({});
    await UsuarioModel.deleteMany({});
    console.log("✅ Colecciones limpiadas.");

    // =========================================================================
    // 1. ESPECIALIDADES (10 registros)
    // =========================================================================
    console.log("💉 Creando Especialidades...");
    const cardiologia = await EspecialidadModel.create({
      nombre: "Cardiología",
      duracionTurnoEnMins: 15,
      costoConsulta: 10000
    });
    const dermatologia = await EspecialidadModel.create({
      nombre: "Dermatología",
      duracionTurnoEnMins: 15,
      costoConsulta: 10000
    });
    const pediatria = await EspecialidadModel.create({
      nombre: "Pediatría",
      duracionTurnoEnMins: 15,
      costoConsulta: 10000
    });
    const traumatologia = await EspecialidadModel.create({
      nombre: "Traumatología",
      duracionTurnoEnMins: 15,
      costoConsulta: 10000
    });
    const oftalmologia = await EspecialidadModel.create({
      nombre: "Oftalmología",
      duracionTurnoEnMins: 15,
      costoConsulta: 10000
    });
    const ginecologia = await EspecialidadModel.create({
      nombre: "Ginecología",
      duracionTurnoEnMins: 15,
      costoConsulta: 10000
    });
    const neurologia = await EspecialidadModel.create({
      nombre: "Neurología",
      duracionTurnoEnMins: 15,
      costoConsulta: 10000
    });
    const psicologia = await EspecialidadModel.create({
      nombre: "Psicología",
      duracionTurnoEnMins: 15,
      costoConsulta: 10000
    });
    const clinicaMedica = await EspecialidadModel.create({
      nombre: "Clínica Médica",
      duracionTurnoEnMins: 15,
      costoConsulta: 10000
    });
    const odontologia = await EspecialidadModel.create({
      nombre: "Odontología",
      duracionTurnoEnMins: 15,
      costoConsulta: 10000
    });
    console.log("✅ 10 Especialidades creadas.");

    // =========================================================================
    // 2. PRÁCTICAS (3 registros)
    // =========================================================================
    console.log("🧾 Creando Prácticas...");
    const practicaRx = await PracticaModel.create({
      codigo: "P-001",
      nombre: "Rx Tórax",
      duracionTurnoEnMins: 15,
      costo: 5000
    });
    const practicaECG = await PracticaModel.create({
      codigo: "P-002",
      nombre: "Electrocardiograma",
      duracionTurnoEnMins: 20,
      costo: 8000
    });
    const practicaLab = await PracticaModel.create({
      codigo: "P-003",
      nombre: "Laboratorio Básico",
      duracionTurnoEnMins: 30,
      costo: 12000
    });
    console.log("✅ 3 Prácticas creadas.");

    // =========================================================================
    // 3. PLANES CON COBERTURAS (3 planes de ejemplo)
    // =========================================================================
    console.log("📋 Creando Planes con Coberturas...");
    
    // Plan ORO: Cobertura TOTAL en especialidades básicas, PARCIAL en otras
    const planOro = await PlanModel.create({
      nombre: "Plan Oro",
      coberturasEspecialidad: [
        { especialidad: cardiologia._id, nivel: "Total" },
        { especialidad: clinicaMedica._id, nivel: "Total" },
        { especialidad: pediatria._id, nivel: "Total" },
        { especialidad: dermatologia._id, nivel: "Parcial" },
        { especialidad: traumatologia._id, nivel: "Parcial" },
        { especialidad: oftalmologia._id, nivel: "Parcial" },
        { especialidad: ginecologia._id, nivel: "Parcial" },
        { especialidad: neurologia._id, nivel: "No cubierta" },
        { especialidad: psicologia._id, nivel: "No cubierta" },
        { especialidad: odontologia._id, nivel: "No cubierta" }
      ],
      coberturasPractica: [
        { practica: practicaRx._id, nivel: "Total" },
        { practica: practicaECG._id, nivel: "Total" },
        { practica: practicaLab._id, nivel: "Parcial" }
      ]
    });

    // Plan PLATA: Cobertura PARCIAL en la mayoría
    const planPlata = await PlanModel.create({
      nombre: "Plan Plata",
      coberturasEspecialidad: [
        { especialidad: cardiologia._id, nivel: "Parcial" },
        { especialidad: clinicaMedica._id, nivel: "Parcial" },
        { especialidad: pediatria._id, nivel: "Parcial" },
        { especialidad: dermatologia._id, nivel: "Parcial" },
        { especialidad: traumatologia._id, nivel: "No cubierta" },
        { especialidad: oftalmologia._id, nivel: "No cubierta" },
        { especialidad: ginecologia._id, nivel: "No cubierta" },
        { especialidad: neurologia._id, nivel: "No cubierta" },
        { especialidad: psicologia._id, nivel: "No cubierta" },
        { especialidad: odontologia._id, nivel: "No cubierta" }
      ],
      coberturasPractica: [
        { practica: practicaRx._id, nivel: "Parcial" },
        { practica: practicaECG._id, nivel: "Parcial" },
        { practica: practicaLab._id, nivel: "No cubierta" }
      ]
    });

    // Plan BRONCE: Cobertura básica (solo consultas generales)
    const planBronce = await PlanModel.create({
      nombre: "Plan Bronce",
      coberturasEspecialidad: [
        { especialidad: clinicaMedica._id, nivel: "Parcial" },
        { especialidad: pediatria._id, nivel: "Parcial" },
        // El resto NO_CUBIERTA por defecto
      ],
      coberturasPractica: [
        { practica: practicaRx._id, nivel: "No cubierta" },
        { practica: practicaECG._id, nivel: "No cubierta" },
        { practica: practicaLab._id, nivel: "No cubierta" }
      ]
    });
    console.log("✅ 3 Planes creados con coberturas.");

    // =========================================================================
    // 4. USUARIOS (20 registros: 10 médicos, 10 pacientes)
    // =========================================================================
    console.log("👥 Creando Usuarios...");
    const usuariosMedicos = [];
    for (let i = 1; i <= 10; i++) {
      const user = await UsuarioModel.create({
        nombreUsuario: `medico${i}`,
        password: `hash_simulado_med${i}_sha256`
      });
      usuariosMedicos.push(user);
    }
    const usuariosPacientes = [];
    for (let i = 1; i <= 10; i++) {
      const user = await UsuarioModel.create({
        nombreUsuario: `paciente${i}`,
        password: `hash_simulado_pac${i}_sha256`
      });
      usuariosPacientes.push(user);
    }
    console.log("✅ 20 Usuarios creados.");

    // =========================================================================
    // 5. SEDES (10 hospitales CABA)
    // =========================================================================
    console.log("🏢 Creando Sedes...");
    const garrahan = await SedeModel.create({
      nombre: "Hospital Garrahan",
      direccion: "Pichincha 1891, C1240AAD CABA"
    });
    const ramosMejia = await SedeModel.create({
      nombre: "Hospital Ramos Mejía",
      direccion: "Urquiza 609, C1182AAD CABA"
    });
    const italiano = await SedeModel.create({
      nombre: "Hospital Italiano",
      direccion: "Gascón 450, C1181ACH CABA"
    });
    const fernandez = await SedeModel.create({
      nombre: "Hospital Fernández",
      direccion: "Cerviño 3356, C1425GMN CABA"
    });
    const argerich = await SedeModel.create({
      nombre: "Hospital Argerich",
      direccion: "Pi y Margall 750, C1155AAF CABA"
    });
    const durand = await SedeModel.create({
      nombre: "Hospital Durand",
      direccion: "Díaz Vélez 5044, C1405DCB CABA"
    });
    const pirovano = await SedeModel.create({
      nombre: "Hospital Pirovano",
      direccion: "Monroe 3555, C1428ASN CABA"
    });
    const penna = await SedeModel.create({
      nombre: "Hospital Penna",
      direccion: "Av. Díaz Vélez 4600, C1405DCB CABA"
    });
    const santojanni = await SedeModel.create({
      nombre: "Hospital Santojanni",
      direccion: "Pilcomayo 3650, C1207AAH CABA"
    });
    const cosmeArgerich = await SedeModel.create({
      nombre: "Hospital Cosme Argerich",
      direccion: "Av. Regimiento de Patricios 555, C1203AAQ CABA"
    });
    console.log("✅ 10 Sedes creadas.");

    // =========================================================================
    // 6. MÉDICOS (10 registros con especialidades y sedes)
    // =========================================================================
    console.log("👨‍⚕️ Creando Médicos...");
    await MedicoModel.create({
      usuario: usuariosMedicos[0]._id,
      matricula: "MP-1001",
      nombre: "Dr. Juan Pérez",
      especialidades: [cardiologia._id],
      sedes: [italiano._id, santojanni._id]
    });
    await MedicoModel.create({
      usuario: usuariosMedicos[1]._id,
      matricula: "MP-1002",
      nombre: "Dra. María González",
      especialidades: [dermatologia._id],
      sedes: [cosmeArgerich._id, santojanni._id]
    });
    await MedicoModel.create({
      usuario: usuariosMedicos[2]._id,
      matricula: "MP-1003",
      nombre: "Dr. Carlos Rodríguez",
      especialidades: [pediatria._id],
      sedes: [cosmeArgerich._id, santojanni._id]
    });
    await MedicoModel.create({
      usuario: usuariosMedicos[3]._id,
      matricula: "MP-1004",
      nombre: "Dra. Ana López",
      especialidades: [traumatologia._id],
      sedes: [santojanni._id]
    });
    await MedicoModel.create({
      usuario: usuariosMedicos[4]._id,
      matricula: "MP-1005",
      nombre: "Dr. Luis Martínez",
      especialidades: [oftalmologia._id],
      sedes: [ramosMejia._id]
    });
    await MedicoModel.create({
      usuario: usuariosMedicos[5]._id,
      matricula: "MP-1006",
      nombre: "Dra. Sofía Sánchez",
      especialidades: [ginecologia._id],
      sedes: [durand._id, pirovano._id, penna._id]
    });
    await MedicoModel.create({
      usuario: usuariosMedicos[6]._id,
      matricula: "MP-1007",
      nombre: "Dr. Pedro Gómez",
      especialidades: [neurologia._id],
      sedes: [italiano._id, argerich._id]
    });
    await MedicoModel.create({
      usuario: usuariosMedicos[7]._id,
      matricula: "MP-1008",
      nombre: "Dra. Laura Díaz",
      especialidades: [psicologia._id],
      sedes: [italiano._id, ramosMejia._id]
    });
    await MedicoModel.create({
      usuario: usuariosMedicos[8]._id,
      matricula: "MP-1009",
      nombre: "Dr. Roberto Ruiz",
      especialidades: [clinicaMedica._id],
      sedes: [ramosMejia._id]
    });
    await MedicoModel.create({
      usuario: usuariosMedicos[9]._id,
      matricula: "MP-1010",
      nombre: "Dra. Carmen Torres",
      especialidades: [odontologia._id],
      sedes: [garrahan._id, fernandez._id]
    });
    console.log("✅ 10 Médicos creados.");

    // =========================================================================
    // 7. PACIENTES (20 registros) CON PLANES ASIGNADOS
    // =========================================================================
    console.log("🤒 Creando Pacientes con Planes...");
    
    // Pacientes con Plan ORO (cobertura alta)
    await PacienteModel.create({
      usuario: usuariosPacientes[0]._id,
      dni: 10000000,
      nombre: "Lucía Fernández",
      plan: planOro._id
    });
    await PacienteModel.create({
      usuario: usuariosPacientes[1]._id,
      dni: 10000001,
      nombre: "Martín Silva",
      plan: planOro._id
    });
    await PacienteModel.create({
      usuario: usuariosPacientes[2]._id,
      dni: 10000002,
      nombre: "Valeria Romero",
      plan: planOro._id
    });

    // Pacientes con Plan PLATA (cobertura media)
    await PacienteModel.create({
      usuario: usuariosPacientes[3]._id,
      dni: 10000003,
      nombre: "Jorge Álvarez",
      plan: planPlata._id
    });
    await PacienteModel.create({
      usuario: usuariosPacientes[4]._id,
      dni: 10000004,
      nombre: "Camila Morales",
      plan: planPlata._id
    });
    await PacienteModel.create({
      usuario: usuariosPacientes[5]._id,
      dni: 10000005,
      nombre: "Diego Castro",
      plan: planPlata._id
    });

    // Pacientes con Plan BRONCE (cobertura básica)
    await PacienteModel.create({
      usuario: usuariosPacientes[6]._id,
      dni: 10000006,
      nombre: "Juliana Ortiz",
      plan: planBronce._id
    });
    await PacienteModel.create({
      usuario: usuariosPacientes[7]._id,
      dni: 10000007,
      nombre: "Federico Gómez",
      plan: planBronce._id
    });

    // Pacientes SIN PLAN (pagan full)
    await PacienteModel.create({
      usuario: usuariosPacientes[8]._id,
      dni: 10000008,
      nombre: "Agustina Herrera",
      plan: null
    });
    await PacienteModel.create({
      usuario: usuariosPacientes[9]._id,
      dni: 10000009,
      nombre: "Nicolás Vargas",
      plan: null
    });

    // Pacientes adicionales (11-20) variados
    await PacienteModel.create({ usuario: usuariosPacientes[0]._id, dni: 10000010, nombre: "Sofía Medina", plan: planOro._id });
    await PacienteModel.create({ usuario: usuariosPacientes[1]._id, dni: 10000011, nombre: "Mateo Aguilar", plan: planPlata._id });
    await PacienteModel.create({ usuario: usuariosPacientes[2]._id, dni: 10000012, nombre: "Isabella Rojas", plan: planBronce._id });
    await PacienteModel.create({ usuario: usuariosPacientes[3]._id, dni: 10000013, nombre: "Santiago Molina", plan: null });
    await PacienteModel.create({ usuario: usuariosPacientes[4]._id, dni: 10000014, nombre: "Mia Delgado", plan: planOro._id });
    await PacienteModel.create({ usuario: usuariosPacientes[5]._id, dni: 10000015, nombre: "Benjamín Paz", plan: planPlata._id });
    await PacienteModel.create({ usuario: usuariosPacientes[6]._id, dni: 10000016, nombre: "Emma Figueroa", plan: planBronce._id });
    await PacienteModel.create({ usuario: usuariosPacientes[7]._id, dni: 10000017, nombre: "Thiago Cabrera", plan: null });
    await PacienteModel.create({ usuario: usuariosPacientes[8]._id, dni: 10000018, nombre: "Olivia Núñez", plan: planOro._id });
    await PacienteModel.create({ usuario: usuariosPacientes[9]._id, dni: 10000019, nombre: "Liam Acosta", plan: planPlata._id });
    
    console.log("✅ 20 Pacientes creados con planes asignados.");

    // =========================================================================
    // 8. TURNOS DE EJEMPLO (6 registros) CON DIFERENTES ESTADOS Y COSTOS
    // =========================================================================
    console.log("📅 Creando Turnos de ejemplo...");
    const medicos = await MedicoModel.find();
    const pacientes = await PacienteModel.find();

    // Turno DISPONIBLE - Cardiología (Plan ORO = $0, Plan PLATA = $5000, Sin plan = $10000)
    await TurnoModel.create({
      fechaHora: new Date(Date.now() + 24 * 60 * 60 * 1000),
      medico: medicos[0]._id,
      paciente: null,
      sede: garrahan._id,
      servicio: cardiologia._id,
      tipoServicio: "Especialidad",
      estado: "DISPONIBLE",
      historialEstados: [],
      costo: cardiologia.costoConsulta
    });

    // Turno DISPONIBLE - Rx Tórax (Plan ORO = $0, Plan PLATA = $2500, Sin plan = $5000)
    await TurnoModel.create({
      fechaHora: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      medico: medicos[1]._id,
      paciente: null,
      sede: cosmeArgerich._id,
      servicio: practicaRx._id,
      tipoServicio: "Practica",
      estado: "DISPONIBLE",
      historialEstados: [],
      costo: practicaRx.costo
    });

    // Turno DISPONIBLE - Pediatría (Plan ORO = $0, Plan BRONCE = $5000, Sin plan = $10000)
    await TurnoModel.create({
      fechaHora: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      medico: medicos[2]._id,
      paciente: null,
      sede: santojanni._id,
      servicio: pediatria._id,
      tipoServicio: "Especialidad",
      estado: "DISPONIBLE",
      historialEstados: [],
      costo: pediatria.costoConsulta
    });

    // Turno RESERVADO - Traumatología (ya tiene paciente asignado)
    await TurnoModel.create({
      fechaHora: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      medico: medicos[3]._id,
      paciente: pacientes[0]._id, // Lucía Fernández (Plan ORO)
      sede: italiano._id,
      servicio: traumatologia._id,
      tipoServicio: "Especialidad",
      estado: "RESERVADO",
      historialEstados: [{
        fechaIngreso: new Date(),
        estado: "DISPONIBLE",
        usuario: null,
        motivo: "Turno generado"
      }, {
        fechaIngreso: new Date(),
        estado: "RESERVADO",
        usuario: usuariosPacientes[0]._id,
        motivo: "Paciente reservó turno"
      }],
      costo: traumatologia.costoConsulta
    });

    // Turno DISPONIBLE - Laboratorio (Plan ORO = $6000, Plan PLATA = $12000, Sin plan = $12000)
    await TurnoModel.create({
      fechaHora: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      medico: medicos[4]._id,
      paciente: null,
      sede: ramosMejia._id,
      servicio: practicaLab._id,
      tipoServicio: "Practica",
      estado: "DISPONIBLE",
      historialEstados: [],
      costo: practicaLab.costo
    });

    // Turno DISPONIBLE - Neurología (NO CUBIERTA en todos los planes = $10000 siempre)
    await TurnoModel.create({
      fechaHora: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      medico: medicos[6]._id,
      paciente: null,
      sede: durand._id,
      servicio: neurologia._id,
      tipoServicio: "Especialidad",
      estado: "DISPONIBLE",
      historialEstados: [],
      costo: neurologia.costoConsulta
    });
    console.log("✅ 6 Turnos creados.");

    // =========================================================================
    // 9. NOTIFICACIONES DE EJEMPLO (5 registros)
    // =========================================================================
    console.log("🔔 Creando Notificaciones de ejemplo...");
    await NotificacionModel.create({
      destinatario: usuariosPacientes[0]._id,
      remitente: usuariosMedicos[0]._id,
      mensaje: "Recordatorio: tiene un turno reservado mañana a las 10:00.",
      fechaHoraCreacion: new Date(),
      leida: false
    });
    await NotificacionModel.create({
      destinatario: usuariosPacientes[1]._id,
      remitente: usuariosMedicos[1]._id,
      mensaje: "Su turno ha sido confirmado.",
      fechaHoraCreacion: new Date(),
      leida: false
    });
    await NotificacionModel.create({
      destinatario: usuariosMedicos[2]._id,
      remitente: usuariosPacientes[2]._id,
      mensaje: "El paciente solicitó reprogramar el turno.",
      fechaHoraCreacion: new Date(),
      leida: true,
      fechaHoraLeida: new Date()
    });
    await NotificacionModel.create({
      destinatario: usuariosPacientes[3]._id,
      remitente: usuariosMedicos[3]._id,
      mensaje: "Su turno fue cancelado por la institución.",
      fechaHoraCreacion: new Date(),
      leida: false
    });
    await NotificacionModel.create({
      destinatario: usuariosPacientes[4]._id,
      remitente: usuariosMedicos[4]._id,
      mensaje: "Gracias por asistir. Por favor complete la encuesta.",
      fechaHoraCreacion: new Date(),
      leida: false
    });
    console.log("✅ 5 Notificaciones creadas.");

    // =========================================================================
    // 🎉 RESUMEN FINAL
    // =========================================================================
    console.log("\n🎉 Seed completado exitosamente!");
    console.log(`📊 Resumen:`);
    console.log(`   • Especialidades: ${(await EspecialidadModel.countDocuments())}`);
    console.log(`   • Prácticas: ${(await PracticaModel.countDocuments())}`);
    console.log(`   • Planes: ${(await PlanModel.countDocuments())}`);
    console.log(`   • Usuarios: ${(await UsuarioModel.countDocuments())}`);
    console.log(`   • Sedes: ${(await SedeModel.countDocuments())}`);
    console.log(`   • Médicos: ${(await MedicoModel.countDocuments())}`);
    console.log(`   • Pacientes: ${(await PacienteModel.countDocuments())}`);
    console.log(`   • Turnos: ${(await TurnoModel.countDocuments())}`);
    console.log(`   • Notificaciones: ${(await NotificacionModel.countDocuments())}`);

  } catch (error) {
    console.error("❌ Error durante el seed:", error);
    throw error;
  }
};

// Ejecutar si se llama directamente desde consola
if (process.argv[1] && process.argv[1].includes("seed.js")) {
  import("./db.js").then(async ({ connectDB, disconnectDB }) => {
    await connectDB();
    await runSeed();
    await disconnectDB();
    process.exit(0);
  });
}
