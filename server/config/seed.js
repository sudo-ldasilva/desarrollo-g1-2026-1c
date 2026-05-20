
// server/config/seed.js
// Crea usuarios, médicos, pacientes, especialidades, turnos, etc
// Facilita enormemente el testing porque todos trabajamos sobre los mismos datos

// Crea usuarios, médicos, pacientes, especialidades, turnos, etc
// Facilita enormemente el testing porque todos trabajamos sobre los mismos datos

// Importar modelos registrados en Mongoose
import {EspecialidadModel} from "../models/EspecialidadModel.js";
import {MedicoModel} from "../models/MedicoModel.js";
import {NotificacionModel} from "../models/NotificacionModel.js";
import {PacienteModel} from "../models/PacienteModel.js";
import {PracticaModel} from "../models/PracticaModel.js";
import {SedeModel} from "../models/SedeModel.js";
import {TurnoModel} from "../models/TurnoModel.js";
import {UsuarioModel} from "../models/UsuarioModel.js";
import dotenv from "dotenv";
dotenv.config();


export const runSeed = async () => {
    try {
        console.log("🌱 Iniciando Seed Determinista...");

        // 1. Limpiar colecciones
        await UsuarioModel.deleteMany({});
        await EspecialidadModel.deleteMany({});
        await MedicoModel.deleteMany({});
        await SedeModel.deleteMany({});
        await PacienteModel.deleteMany({});
        await PracticaModel.deleteMany({});
        await TurnoModel.deleteMany({});
        await NotificacionModel.deleteMany({});
        console.log("🧹 Colecciones limpiadas.");

        // =========================================================================
        // 2. ESPECIALIDADES (10 registros)
        // =========================================================================
        console.log("💉 Creando Especialidades...");

        // Capturamos las referencias para usar sus _id automáticos después
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
        // 3. USUARIOS (20 registros: 10 para médicos, 10 para pacientes)
        // =========================================================================
        console.log("👥 Creando Usuarios...");

        // Capturamos referencias de usuarios para usar sus _id después
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
        // 4. SEDES (10 registros - Hospitales CABA)
        // =========================================================================
        console.log("🏢 Creando Sedes...");

        // Capturamos referencias de sedes para usar sus _id después
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
        // PRÁCTICAS (3 registros) - para turnos que no sean de Especialidad
        // =========================================================================
        console.log("🧾 Creando Prácticas...");
        const practicaRx = await PracticaModel.create({ codigo: "P-001", nombre: "Rx Tórax", duracionTurnoEnMins: 15, costo: 5000 });
        const practicaECG = await PracticaModel.create({ codigo: "P-002", nombre: "Electrocardiograma", duracionTurnoEnMins: 20, costo: 8000 });
        console.log("✅ 2 Prácticas creadas.");

        // =========================================================================
        // 5. MÉDICOS (10 registros)
        // =========================================================================
        console.log("👨‍⚕️ Creando Médicos...");

        // Usamos los _id automáticos capturados de especialidades y usuarios
        await MedicoModel.create({
            usuario: usuariosMedicos[0]._id, // ObjectId, no string
            matricula: "MP-1001",
            nombre: "Dr. Juan Pérez",
            especialidades: [cardiologia._id], // Array de ObjectId válidos
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
        // 6. PACIENTES (20 registros)
        // =========================================================================
        console.log("🤒 Creando Pacientes...");

        // Pacientes 1-10
        await PacienteModel.create({
            usuario: usuariosPacientes[0]._id, // 🔹 ObjectId
            dni: 10000000,
            nombre: "Lucía Fernández"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[1]._id,
            dni: 10000001,
            nombre: "Martín Silva"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[2]._id,
            dni: 10000002,
            nombre: "Valeria Romero"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[3]._id,
            dni: 10000003,
            nombre: "Jorge Álvarez"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[4]._id,
            dni: 10000004,
            nombre: "Camila Morales"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[5]._id,
            dni: 10000005,
            nombre: "Diego Castro"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[6]._id,
            dni: 10000006,
            nombre: "Juliana Ortiz"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[7]._id,
            dni: 10000007,
            nombre: "Federico Gómez"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[8]._id,
            dni: 10000008,
            nombre: "Agustina Herrera"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[9]._id,
            dni: 10000009,
            nombre: "Nicolás Vargas"
        });

        // Pacientes 11-20
        await PacienteModel.create({
            usuario: usuariosPacientes[0]._id,
            dni: 10000010,
            nombre: "Sofía Medina"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[1]._id,
            dni: 10000011,
            nombre: "Mateo Aguilar"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[2]._id,
            dni: 10000012,
            nombre: "Isabella Rojas"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[3]._id,
            dni: 10000013,
            nombre: "Santiago Molina"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[4]._id,
            dni: 10000014,
            nombre: "Mia Delgado"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[5]._id,
            dni: 10000015,
            nombre: "Benjamín Paz"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[6]._id,
            dni: 10000016,
            nombre: "Emma Figueroa"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[7]._id,
            dni: 10000017,
            nombre: "Thiago Cabrera"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[8]._id,
            dni: 10000018,
            nombre: "Olivia Núñez"
        });
        await PacienteModel.create({
            usuario: usuariosPacientes[9]._id,
            dni: 10000019,
            nombre: "Liam Acosta"
        });

        console.log("✅ 20 Pacientes creados.");
        // =========================================================================
        // 7. TURNOS (6 registros) y NOTIFICACIONES (5 registros)
        // =========================================================================
        console.log("📅 Creando Turnos de ejemplo...");

        // Traemos referencias útiles
        const medicos = await MedicoModel.find();
        const pacientes = await PacienteModel.find();

        // Crear 6 turnos usando algunas especialidades ya creadas
        await TurnoModel.create({
            fechaHora: new Date(Date.now() + 24 * 60 * 60 * 1000), // mañana
            medico: medicos[0]._id,
            paciente: pacientes[0]._id,
            sede: garrahan._id,
            servicio: cardiologia._id,
            tipoServicio: "Especialidad",
            estado: "DISPONIBLE",
            historialEstados: [],
            costo: cardiologia.costoConsulta
        });

        await TurnoModel.create({
            fechaHora: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            medico: medicos[1]._id,
            paciente: pacientes[1]._id,
            sede: cosmeArgerich._id,
            servicio: practicaECG._id,
            tipoServicio: "Practica",
            estado: "DISPONIBLE",
            historialEstados: [],
            costo: practicaECG.costo
        });

        await TurnoModel.create({
            fechaHora: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            medico: medicos[2]._id,
            paciente: pacientes[2]._id,
            sede: santojanni._id,
            servicio: pediatria._id,
            tipoServicio: "Especialidad",
            estado: "DISPONIBLE",
            historialEstados: [],
            costo: pediatria.costoConsulta
        });

        await TurnoModel.create({
            fechaHora: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
            medico: medicos[3]._id,
            paciente: pacientes[3]._id,
            sede: italiano._id,
            servicio: traumatologia._id,
            tipoServicio: "Especialidad",
            estado: "DISPONIBLE",
            historialEstados: [],
            costo: traumatologia.costoConsulta
        });

        await TurnoModel.create({
            fechaHora: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            medico: medicos[4]._id,
            paciente: pacientes[4]._id,
            sede: ramosMejia._id,
            servicio: practicaRx._id,
            tipoServicio: "Practica",
            estado: "DISPONIBLE",
            historialEstados: [],
            costo: practicaRx.costo
        });

        await TurnoModel.create({
            fechaHora: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
            medico: medicos[5]._id,
            paciente: pacientes[5]._id,
            sede: durand._id,
            servicio: ginecologia._id,
            tipoServicio: "Especialidad",
            estado: "DISPONIBLE",
            historialEstados: [],
            costo: ginecologia.costoConsulta
        });

        console.log("✅ 6 Turnos creados.");

        console.log("🔔 Creando Notificaciones de ejemplo...");

        // Crear 5 notificaciones simples
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

        console.log("🎉 Seed completado exitosamente.");

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
