// Crea usuarios, médicos, pacientes, especialidades, turnos, etc
// Facilita enormemente el testing porque todos trabajamos sobre los mismos datos

import {TurnoModel} from "../models/turnoSchema.js";
import {EspecialidadModel} from "../models/especialidadSchema.js";
import {MedicoModel} from "../models/medicoSchema.js";
import {PacienteModel} from "../models/pacienteSchema.js";
import {PracticaModel} from "../models/practicaSchema.js";
import {SedeModel} from "../models/sedeSchema.js";
import {UsuarioModel} from "../models/usuarioSchema.js";
import {NotificacionModel} from "../models/notificacionSchema.js";

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
    
        const especialidades = [];
        especialidades.push(await EspecialidadModel.create({
            nombre: "Cardiología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));
        especialidades.push(await EspecialidadModel.create({
            nombre: "Dermatología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));
        especialidades.push(await EspecialidadModel.create({
            nombre: "Pediatría",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));
        especialidades.push(await EspecialidadModel.create({
            nombre: "Traumatología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));
        especialidades.push(await EspecialidadModel.create({
            nombre: "Oftalmología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));
        especialidades.push(await EspecialidadModel.create({
            nombre: "Ginecología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));
        especialidades.push(await EspecialidadModel.create({
            nombre: "Neurología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));
        especialidades.push(await EspecialidadModel.create({
            nombre: "Psicología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));
        especialidades.push(await EspecialidadModel.create({
            nombre: "Clínica Médica",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));
        especialidades.push(await EspecialidadModel.create({
            nombre: "Odontología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));
        console.log("✅ 10 Especialidades creadas.");

        // =========================================================================
        // 3. USUARIOS (20 registros: 10 para médicos, 10 para pacientes)
        // =========================================================================
        console.log("👥 Creando Usuarios...");
    
        const usuarios = [];
        // Usuarios para Médicos (Índices 0-9)
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "medico1", password: "hash_simulado_med1_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "medico2", password: "hash_simulado_med2_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "medico3", password: "hash_simulado_med3_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "medico4", password: "hash_simulado_med4_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "medico5", password: "hash_simulado_med5_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "medico6", password: "hash_simulado_med6_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "medico7", password: "hash_simulado_med7_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "medico8", password: "hash_simulado_med8_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "medico9", password: "hash_simulado_med9_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "medico10", password: "hash_simulado_med10_sha256" }));

        // Usuarios para Pacientes (Índices 10-19)
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "paciente1", password: "hash_simulado_pac1_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "paciente2", password: "hash_simulado_pac2_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "paciente3", password: "hash_simulado_pac3_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "paciente4", password: "hash_simulado_pac4_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "paciente5", password: "hash_simulado_pac5_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "paciente6", password: "hash_simulado_pac6_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "paciente7", password: "hash_simulado_pac7_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "paciente8", password: "hash_simulado_pac8_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "paciente9", password: "hash_simulado_pac9_sha256" }));
        usuarios.push(await UsuarioModel.create({ nombreUsuario: "paciente10", password: "hash_simulado_pac10_sha256" }));
    
        console.log("✅ 20 Usuarios creados.");

        // =========================================================================
        // 4. MÉDICOS (10 registros)
        // =========================================================================
        console.log("👨‍⚕️ Creando Médicos...");

        const medicos = [];
        medicos.push(await MedicoModel.create({
            usuarioId: usuarios[0]._id,
            matricula: "MP-1001",
            nombre: "Dr. Juan Pérez",
            especialidades: [especialidades[0]._id] // Cardiología
        }));
        medicos.push(await MedicoModel.create({
            usuarioId: usuarios[1]._id,
            matricula: "MP-1002",
            nombre: "Dra. María González",
            especialidades: [especialidades[1]._id] // Dermatología
        }));
        medicos.push(await MedicoModel.create({
            usuarioId: usuarios[2]._id,
            matricula: "MP-1003",
            nombre: "Dr. Carlos Rodríguez",
            especialidades: [especialidades[2]._id] // Pediatría
        }));
        medicos.push(await MedicoModel.create({
            usuarioId: usuarios[3]._id,
            matricula: "MP-1004",
            nombre: "Dra. Ana López",
            especialidades: [especialidades[3]._id] // Traumatología
        }));
        medicos.push(await MedicoModel.create({
            usuarioId: usuarios[4]._id,
            matricula: "MP-1005",
            nombre: "Dr. Luis Martínez",
            especialidades: [especialidades[4]._id] // Oftalmología
        }));
        medicos.push(await MedicoModel.create({
            usuarioId: usuarios[5]._id,
            matricula: "MP-1006",
            nombre: "Dra. Sofía Sánchez",
            especialidades: [especialidades[5]._id] // Ginecología
        }));
        medicos.push(await MedicoModel.create({
            usuarioId: usuarios[6]._id,
            matricula: "MP-1007",
            nombre: "Dr. Pedro Gómez",
            especialidades: [especialidades[6]._id] // Neurología
        }));
        medicos.push(await MedicoModel.create({
            usuarioId: usuarios[7]._id,
            matricula: "MP-1008",
            nombre: "Dra. Laura Díaz",
            especialidades: [especialidades[7]._id] // Psicología
        }));
        medicos.push(await MedicoModel.create({
            usuarioId: usuarios[8]._id,
            matricula: "MP-1009",
            nombre: "Dr. Roberto Ruiz",
            especialidades: [especialidades[8]._id] // Clínica Médica
        }));
        medicos.push(await MedicoModel.create({
            usuarioId: usuarios[9]._id,
            matricula: "MP-1010",
            nombre: "Dra. Carmen Torres",
            especialidades: [especialidades[9]._id] // Odontología
        }));
        console.log("✅ 10 Médicos creados.");

        // =========================================================================
        // 5. SEDES (10 registros - Hospitales CABA)
        // =========================================================================
        console.log("🏢 Creando Sedes...");

        const sedes = [];
        sedes.push(await SedeModel.create({
            nombre: "Hospital Garrahan",
            direccion: "Pichincha 1891, C1240AAD CABA"
        }));
        sedes.push(await SedeModel.create({
            nombre: "Hospital Ramos Mejía",
            direccion: "Urquiza 609, C1182AAD CABA"
        }));
        sedes.push(await SedeModel.create({
            nombre: "Hospital Italiano",
            direccion: "Gascón 450, C1181ACH CABA"
        }));
        sedes.push(await SedeModel.create({
            nombre: "Hospital Fernández",
            direccion: "Cerviño 3356, C1425GMN CABA"
        }));
        sedes.push(await SedeModel.create({
            nombre: "Hospital Argerich",
            direccion: "Pi y Margall 750, C1155AAF CABA"
        }));
        sedes.push(await SedeModel.create({
            nombre: "Hospital Durand",
            direccion: "Díaz Vélez 5044, C1405DCB CABA"
        }));
        sedes.push(await SedeModel.create({
            nombre: "Hospital Pirovano",
            direccion: "Monroe 3555, C1428ASN CABA"
        }));
        sedes.push(await SedeModel.create({
            nombre: "Hospital Penna",
            direccion: "Av. Díaz Vélez 4600, C1405DCB CABA"
        }));
        sedes.push(await SedeModel.create({
            nombre: "Hospital Santojanni",
            direccion: "Pilcomayo 3650, C1207AAH CABA"
        }));
        sedes.push(await SedeModel.create({
            nombre: "Hospital Cosme Argerich",
            direccion: "Av. Regimiento de Patricios 555, C1203AAQ CABA"

        }));
        console.log("✅ 10 Sedes creadas.");

        // =========================================================================
        // 6. PACIENTES (20 registros)
        // =========================================================================
        console.log("🤒 Creando Pacientes...");

        const pacientes = [];
        // Pacientes 0-9
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[10]._id, dni: 10000000, nombre: "Lucía Fernández" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[11]._id, dni: 10000001, nombre: "Martín Silva" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[12]._id, dni: 10000002, nombre: "Valeria Romero" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[13]._id, dni: 10000003, nombre: "Jorge Álvarez" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[14]._id, dni: 10000004, nombre: "Camila Morales" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[15]._id, dni: 10000005, nombre: "Diego Castro" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[16]._id, dni: 10000006, nombre: "Juliana Ortiz" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[17]._id, dni: 10000007, nombre: "Federico Gómez" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[18]._id, dni: 10000008, nombre: "Agustina Herrera" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[19]._id, dni: 10000009, nombre: "Nicolás Vargas" }));

        // Pacientes 10-19 (Continuación de DNIs)
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[10]._id, dni: 10000010, nombre: "Sofía Medina" })); // Reutilizando usuario10 por simplicidad
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[11]._id, dni: 10000011, nombre: "Mateo Aguilar" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[12]._id, dni: 10000012, nombre: "Isabella Rojas" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[13]._id, dni: 10000013, nombre: "Santiago Molina" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[14]._id, dni: 10000014, nombre: "Mia Delgado" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[15]._id, dni: 10000015, nombre: "Benjamín Paz" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[16]._id, dni: 10000016, nombre: "Emma Figueroa" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[17]._id, dni: 10000017, nombre: "Thiago Cabrera" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[18]._id, dni: 10000018, nombre: "Olivia Núñez" }));
        pacientes.push(await PacienteModel.create({ usuarioId: usuarios[19]._id, dni: 10000019, nombre: "Liam Acosta" }));

        console.log("✅ 20 Pacientes creados.");

        // =========================================================================
        // 7. PRACTICAS
        // =========================================================================
        console.log("🩺 Creando Prácticas...");

        const practicas = [];
        practicas.push(await PracticaModel.create({
            codigo: "CARD-01",
            nombre: "Electrocardiograma de reposo",
            duracionTurnoEnMins: 20,
            costoConsulta: 15000
        }));

        practicas.push(await PracticaModel.create({
            codigo: "DERM-05",
            nombre: "Dermatoscopía digital",
            duracionTurnoEnMins: 30,
            costoConsulta: 25000
        }));

        practicas.push(await PracticaModel.create({
            codigo: "CLIN-01",
            nombre: "Consulta Médica General",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        }));

        practicas.push(await PracticaModel.create({
            codigo: "TRAU-12",
            nombre: "Infiltración articular",
            duracionTurnoEnMins: 45,
            costoConsulta: 35000
        }));

        practicas.push(await PracticaModel.create({
            codigo: "LAB-99",
            nombre: "Análisis de sangre completo",
            duracionTurnoEnMins: 10,
            costoConsulta: 8000
        }));

        practicas.push(await PracticaModel.create({
            codigo: "OFTAL-02",
            nombre: "Fondo de ojo",
            duracionTurnoEnMins: 20,
            costoConsulta: 12000
        }));
        console.log("✅ 6 Prácticas creadas.");

        // =========================================================================
        // 8. TURNOS
        // =========================================================================
        console.log("📅 Creando Turnos...");

        await TurnoModel.create({
            fechaHora: new Date("2026-06-15T09:00:00Z"),
            medico: medicos[0]._id,
            paciente: null,
            sede: sedes[0]._id,
            practica: practicas[0]._id,
            especialidad: especialidades[0]._id,
            estado: "DISPONIBLE",
            costo: 0
        });

        await TurnoModel.create({
            fechaHora: new Date("2026-06-16T10:00:00Z"),
            medico: medicos[1]._id,
            paciente: null,
            sede: sedes[1]._id,
            practica: practicas[1]._id,
            especialidad: especialidades[1]._id,
            estado: "DISPONIBLE",
            costo: 1500
        });

        await TurnoModel.create({
            fechaHora: new Date("2026-06-17T11:00:00Z"),
            medico: medicos[2]._id,
            paciente: null,
            sede: sedes[2]._id,
            practica: practicas[2]._id,
            especialidad: especialidades[2]._id,
            estado: "DISPONIBLE",
            costo: 2500
        });

        await TurnoModel.create({
            fechaHora: new Date("2026-06-18T08:30:00Z"),
            medico: medicos[3]._id,
            paciente: null,
            sede: sedes[3]._id,
            practica: practicas[3]._id,
            especialidad: especialidades[3]._id,
            estado: "DISPONIBLE",
            costo: 0
        });

        await TurnoModel.create({
            fechaHora: new Date("2026-06-19T09:30:00Z"),
            medico: medicos[4]._id,
            paciente: null,
            sede: sedes[4]._id,
            practica: practicas[4]._id,
            especialidad: especialidades[4]._id,
            estado: "DISPONIBLE",
            costo: 3000
        });

        await TurnoModel.create({
            fechaHora: new Date("2026-06-20T14:00:00Z"),
            medico: medicos[5]._id,
            paciente: null,
            sede: sedes[5]._id,
            practica: practicas[5]._id,
            especialidad: especialidades[5]._id,
            estado: "DISPONIBLE",
            costo: 1200
        });
        console.log("✅ 6 Turnos creados.");

        // =========================================================================
        // 9. NOTIFICACIONES
        // =========================================================================
        console.log("🔔 Creando Notificaciones...");

        await NotificacionModel.create({
            destinatario: usuarios[10]._id,
            remitente: usuarios[0]._id,
            mensaje: "Tu turno con Dr. Juan Pérez en Hospital Garrahan el 15/06 a las 09:00 fue reservado con éxito.",
            fechaHoraCreacion: new Date("2026-05-15T12:00:00Z"),
            leida: false
        });

        await NotificacionModel.create({
            destinatario: usuarios[11]._id,
            remitente: usuarios[1]._id,
            mensaje: "La consulta de dermatología programada para el 16/06 a las 10:00 en Hospital Ramos Mejía está confirmada.",
            fechaHoraCreacion: new Date("2026-05-16T09:30:00Z"),
            fechaHoraLeida: new Date("2026-05-16T09:45:00Z"),
            leida: true
        });

        await NotificacionModel.create({
            destinatario: usuarios[12]._id,
            remitente: usuarios[2]._id,
            mensaje: "Tu turno de consulta médica general fue reagendado para el 17/06 a las 11:00 en Hospital Italiano.",
            fechaHoraCreacion: new Date("2026-05-17T10:00:00Z"),
            leida: false
        });

        await NotificacionModel.create({
            destinatario: usuarios[13]._id,
            remitente: usuarios[3]._id,
            mensaje: "El turno de traumatología para el 18/06 a las 08:30 en Hospital Fernández fue cancelado.",
            fechaHoraCreacion: new Date("2026-05-18T08:00:00Z"),
            leida: false
        });

        await NotificacionModel.create({
            destinatario: usuarios[14]._id,
            remitente: usuarios[4]._id,
            mensaje: "Recordatorio: tu turno de oftalmología es el 19/06 a las 09:30 en Hospital Argerich.",
            fechaHoraCreacion: new Date("2026-05-19T15:00:00Z"),
            leida: true,
            fechaHoraLeida: new Date("2026-05-19T15:05:00Z")
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
