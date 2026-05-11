// Crea usuarios, médicos, pacientes, especialidades, turnos, etc
// Facilita enormemente el testing porque todos trabajamos sobre los mismos datos

import mongoose from "mongoose";

import {TurnoModel} from "../schemas/turnoSchema.js";
// import {EspecialidadModel} from "../schemas/especialidadSchema.js";
// import {medicoSchema} from "../schemas/medicoSchema.js";
// import {PacienteSchema} from "../schemas/pacienteSchema.js";
// import {PracticaSchema} from "../schemas/epracticaSchema.js";
// import {SededadModel} from "../schemas/sedeSchema.js";


// --- DEFINICIÓN DE SCHEMAS PARA MONGOOSE ---
// Definimos los esquemas localmente para asegurar que el seed funcione independientemente de los modelos de dominio.

const UsuarioSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nombreUsuario: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const EspecialidadSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    duracionTurnoEnMins: { type: Number, default: 15 },
    costoConsulta: { type: Number, default: 10000 }
});

const MedicoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    usuarioId: { type: String, ref: "Usuario", required: true },
    matricula: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    especialidades: [{ type: String, ref: "Especialidad" }]
});

const SedeSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true }
});

const PacienteSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    usuarioId: { type: String, ref: "Usuario", required: true },
    dni: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    obraSocial: { type: String, default: "OSDE" },
    plan: { type: String, default: "Plan 210" }
});

// Modelos
const UsuarioModel = mongoose.model("Usuario", UsuarioSchema);
const EspecialidadModel = mongoose.model("Especialidad", EspecialidadSchema);
const MedicoModel = mongoose.model("Medico", MedicoSchema);
const SedeModel = mongoose.model("Sede", SedeSchema);
const PacienteModel = mongoose.model("Paciente", PacienteSchema);

export const runSeed = async () => {
    try {
        console.log("🌱 Iniciando Seed Determinista...");

        // 1. Limpiar colecciones
        await UsuarioModel.deleteMany({});
        await EspecialidadModel.deleteMany({});
        await MedicoModel.deleteMany({});
        await SedeModel.deleteMany({});
        await PacienteModel.deleteMany({});
        await TurnosModel.deleteMany({});
        console.log("🧹 Colecciones limpiadas.");

        // =========================================================================
        // 2. ESPECIALIDADES (10 registros)
        // =========================================================================
        console.log("💉 Creando Especialidades...");
    
        await EspecialidadModel.create({
            id: "550e8400-e29b-41d4-a716-446655440001",
            nombre: "Cardiología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        await EspecialidadModel.create({
            id: "550e8400-e29b-41d4-a716-446655440002",
            nombre: "Dermatología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        await EspecialidadModel.create({
            id: "550e8400-e29b-41d4-a716-446655440003",
            nombre: "Pediatría",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        await EspecialidadModel.create({
            id: "550e8400-e29b-41d4-a716-446655440004",
            nombre: "Traumatología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        await EspecialidadModel.create({
            id: "550e8400-e29b-41d4-a716-446655440005",
            nombre: "Oftalmología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        await EspecialidadModel.create({
            id: "550e8400-e29b-41d4-a716-446655440006",
            nombre: "Ginecología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        await EspecialidadModel.create({
            id: "550e8400-e29b-41d4-a716-446655440007",
            nombre: "Neurología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        await EspecialidadModel.create({
            id: "550e8400-e29b-41d4-a716-446655440008",
            nombre: "Psicología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        await EspecialidadModel.create({
            id: "550e8400-e29b-41d4-a716-446655440009",
            nombre: "Clínica Médica",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        await EspecialidadModel.create({
            id: "550e8400-e29b-41d4-a716-446655440010",
            nombre: "Odontología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        console.log("✅ 10 Especialidades creadas.");

        // =========================================================================
        // 3. USUARIOS (20 registros: 10 para médicos, 10 para pacientes)
        // =========================================================================
        console.log("👥 Creando Usuarios...");
    
        // Usuarios para Médicos (Índices 1-10)
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440011", nombreUsuario: "medico1", password: "hash_simulado_med1_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440012", nombreUsuario: "medico2", password: "hash_simulado_med2_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440013", nombreUsuario: "medico3", password: "hash_simulado_med3_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440014", nombreUsuario: "medico4", password: "hash_simulado_med4_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440015", nombreUsuario: "medico5", password: "hash_simulado_med5_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440016", nombreUsuario: "medico6", password: "hash_simulado_med6_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440017", nombreUsuario: "medico7", password: "hash_simulado_med7_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440018", nombreUsuario: "medico8", password: "hash_simulado_med8_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440019", nombreUsuario: "medico9", password: "hash_simulado_med9_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440020", nombreUsuario: "medico10", password: "hash_simulado_med10_sha256" });

        // Usuarios para Pacientes (Índices 11-20)
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440021", nombreUsuario: "paciente1", password: "hash_simulado_pac1_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440022", nombreUsuario: "paciente2", password: "hash_simulado_pac2_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440023", nombreUsuario: "paciente3", password: "hash_simulado_pac3_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440024", nombreUsuario: "paciente4", password: "hash_simulado_pac4_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440025", nombreUsuario: "paciente5", password: "hash_simulado_pac5_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440026", nombreUsuario: "paciente6", password: "hash_simulado_pac6_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440027", nombreUsuario: "paciente7", password: "hash_simulado_pac7_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440028", nombreUsuario: "paciente8", password: "hash_simulado_pac8_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440029", nombreUsuario: "paciente9", password: "hash_simulado_pac9_sha256" });
        await UsuarioModel.create({ id: "550e8400-e29b-41d4-a716-446655440030", nombreUsuario: "paciente10", password: "hash_simulado_pac10_sha256" });
    
        console.log("✅ 20 Usuarios creados.");

        // =========================================================================
        // 4. MÉDICOS (10 registros)
        // =========================================================================
        console.log("👨‍⚕️ Creando Médicos...");

        await MedicoModel.create({
            id: "550e8400-e29b-41d4-a716-446655440031",
            usuarioId: "550e8400-e29b-41d4-a716-446655440011", // medico1
            matricula: "MP-1001",
            nombre: "Dr. Juan Pérez",
            especialidades: ["550e8400-e29b-41d4-a716-446655440001"] // Cardiología
        });
        await MedicoModel.create({
            id: "550e8400-e29b-41d4-a716-446655440032",
            usuarioId: "550e8400-e29b-41d4-a716-446655440012", // medico2
            matricula: "MP-1002",
            nombre: "Dra. María González",
            especialidades: ["550e8400-e29b-41d4-a716-446655440002"] // Dermatología
        });
        await MedicoModel.create({
            id: "550e8400-e29b-41d4-a716-446655440033",
            usuarioId: "550e8400-e29b-41d4-a716-446655440013", // medico3
            matricula: "MP-1003",
            nombre: "Dr. Carlos Rodríguez",
            especialidades: ["550e8400-e29b-41d4-a716-446655440003"] // Pediatría
        });
        await MedicoModel.create({
            id: "550e8400-e29b-41d4-a716-446655440034",
            usuarioId: "550e8400-e29b-41d4-a716-446655440014", // medico4
            matricula: "MP-1004",
            nombre: "Dra. Ana López",
            especialidades: ["550e8400-e29b-41d4-a716-446655440004"] // Traumatología
        });
        await MedicoModel.create({
            id: "550e8400-e29b-41d4-a716-446655440035",
            usuarioId: "550e8400-e29b-41d4-a716-446655440015", // medico5
            matricula: "MP-1005",
            nombre: "Dr. Luis Martínez",
            especialidades: ["550e8400-e29b-41d4-a716-446655440005"] // Oftalmología
        });
        await MedicoModel.create({
            id: "550e8400-e29b-41d4-a716-446655440036",
            usuarioId: "550e8400-e29b-41d4-a716-446655440016", // medico6
            matricula: "MP-1006",
            nombre: "Dra. Sofía Sánchez",
            especialidades: ["550e8400-e29b-41d4-a716-446655440006"] // Ginecología
        });
        await MedicoModel.create({
            id: "550e8400-e29b-41d4-a716-446655440037",
            usuarioId: "550e8400-e29b-41d4-a716-446655440017", // medico7
            matricula: "MP-1007",
            nombre: "Dr. Pedro Gómez",
            especialidades: ["550e8400-e29b-41d4-a716-446655440007"] // Neurología
        });
        await MedicoModel.create({
            id: "550e8400-e29b-41d4-a716-446655440038",
            usuarioId: "550e8400-e29b-41d4-a716-446655440018", // medico8
            matricula: "MP-1008",
            nombre: "Dra. Laura Díaz",
            especialidades: ["550e8400-e29b-41d4-a716-446655440008"] // Psicología
        });
        await MedicoModel.create({
            id: "550e8400-e29b-41d4-a716-446655440039",
            usuarioId: "550e8400-e29b-41d4-a716-446655440019", // medico9
            matricula: "MP-1009",
            nombre: "Dr. Roberto Ruiz",
            especialidades: ["550e8400-e29b-41d4-a716-446655440009"] // Clínica Médica
        });
        await MedicoModel.create({
            id: "550e8400-e29b-41d4-a716-446655440040",
            usuarioId: "550e8400-e29b-41d4-a716-446655440020", // medico10
            matricula: "MP-1010",
            nombre: "Dra. Carmen Torres",
            especialidades: ["550e8400-e29b-41d4-a716-446655440010"] // Odontología
        });
        console.log("✅ 10 Médicos creados.");

        // =========================================================================
        // 5. SEDES (10 registros - Hospitales CABA)
        // =========================================================================
        console.log("🏢 Creando Sedes...");

        await SedeModel.create({
            id: "550e8400-e29b-41d4-a716-446655440041",
            nombre: "Hospital Garrahan",
            direccion: "Pichincha 1891, C1240AAD CABA"
        });
        await SedeModel.create({
            id: "550e8400-e29b-41d4-a716-446655440042",
            nombre: "Hospital Ramos Mejía",
            direccion: "Urquiza 609, C1182AAD CABA"
        });
        await SedeModel.create({
            id: "550e8400-e29b-41d4-a716-446655440043",
            nombre: "Hospital Italiano",
            direccion: "Gascón 450, C1181ACH CABA"
        });
        await SedeModel.create({
            id: "550e8400-e29b-41d4-a716-446655440044",
            nombre: "Hospital Fernández",
            direccion: "Cerviño 3356, C1425GMN CABA"
        });
        await SedeModel.create({
            id: "550e8400-e29b-41d4-a716-446655440045",
            nombre: "Hospital Argerich",
            direccion: "Pi y Margall 750, C1155AAF CABA"
        });
        await SedeModel.create({
            id: "550e8400-e29b-41d4-a716-446655440046",
            nombre: "Hospital Durand",
            direccion: "Díaz Vélez 5044, C1405DCB CABA"
        });
        await SedeModel.create({
            id: "550e8400-e29b-41d4-a716-446655440047",
            nombre: "Hospital Pirovano",
            direccion: "Monroe 3555, C1428ASN CABA"
        });
        await SedeModel.create({
            id: "550e8400-e29b-41d4-a716-446655440048",
            nombre: "Hospital Penna",
            direccion: "Av. Díaz Vélez 4600, C1405DCB CABA"
        });
        await SedeModel.create({
            id: "550e8400-e29b-41d4-a716-446655440049",
            nombre: "Hospital Santojanni",
            direccion: "Pilcomayo 3650, C1207AAH CABA"
        });
        await SedeModel.create({
            id: "550e8400-e29b-41d4-a716-446655440050",
            nombre: "Hospital Cosme Argerich",
            direccion: "Av. Regimiento de Patricios 555, C1203AAQ CABA"

        });
        console.log("✅ 10 Sedes creadas.");

        // =========================================================================
        // 6. PACIENTES (20 registros)
        // =========================================================================
        console.log("🤒 Creando Pacientes...");

        // Pacientes 1-10
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440051", usuarioId: "550e8400-e29b-41d4-a716-446655440021", dni: 10000000, nombre: "Lucía Fernández" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440052", usuarioId: "550e8400-e29b-41d4-a716-446655440022", dni: 10000001, nombre: "Martín Silva" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440053", usuarioId: "550e8400-e29b-41d4-a716-446655440023", dni: 10000002, nombre: "Valeria Romero" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440054", usuarioId: "550e8400-e29b-41d4-a716-446655440024", dni: 10000003, nombre: "Jorge Álvarez" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440055", usuarioId: "550e8400-e29b-41d4-a716-446655440025", dni: 10000004, nombre: "Camila Morales" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440056", usuarioId: "550e8400-e29b-41d4-a716-446655440026", dni: 10000005, nombre: "Diego Castro" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440057", usuarioId: "550e8400-e29b-41d4-a716-446655440027", dni: 10000006, nombre: "Juliana Ortiz" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440058", usuarioId: "550e8400-e29b-41d4-a716-446655440028", dni: 10000007, nombre: "Federico Gómez" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440059", usuarioId: "550e8400-e29b-41d4-a716-446655440029", dni: 10000008, nombre: "Agustina Herrera" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440060", usuarioId: "550e8400-e29b-41d4-a716-446655440030", dni: 10000009, nombre: "Nicolás Vargas" });

        // Pacientes 11-20 (Continuación de DNIs)
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440061", usuarioId: "550e8400-e29b-41d4-a716-446655440021", dni: 10000010, nombre: "Sofía Medina" }); // Reutilizando usuario11 por simplicidad o crear nuevos si fuera necesario, aquí reuso para mantener 20 usuarios totales
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440062", usuarioId: "550e8400-e29b-41d4-a716-446655440022", dni: 10000011, nombre: "Mateo Aguilar" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440063", usuarioId: "550e8400-e29b-41d4-a716-446655440023", dni: 10000012, nombre: "Isabella Rojas" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440064", usuarioId: "550e8400-e29b-41d4-a716-446655440024", dni: 10000013, nombre: "Santiago Molina" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440065", usuarioId: "550e8400-e29b-41d4-a716-446655440025", dni: 10000014, nombre: "Mia Delgado" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440066", usuarioId: "550e8400-e29b-41d4-a716-446655440026", dni: 10000015, nombre: "Benjamín Paz" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440067", usuarioId: "550e8400-e29b-41d4-a716-446655440027", dni: 10000016, nombre: "Emma Figueroa" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440068", usuarioId: "550e8400-e29b-41d4-a716-446655440028", dni: 10000017, nombre: "Thiago Cabrera" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440069", usuarioId: "550e8400-e29b-41d4-a716-446655440029", dni: 10000018, nombre: "Olivia Núñez" });
        await PacienteModel.create({ id: "550e8400-e29b-41d4-a716-446655440070", usuarioId: "550e8400-e29b-41d4-a716-446655440030", dni: 10000019, nombre: "Liam Acosta" });

        console.log("✅ 20 Pacientes creados.");

        // =========================================================================
        // 7. TURNOS
        // =========================================================================
        console.log(" Creando Turnos...");

        await TurnoModel.create({
            fechaHora: new Date("2026-05-15T09:00:00Z"),
            medico: "550e8400-e29b-41d4-a716-446655440031",
            paciente: null,
            sede: "645a1b2c3d4e5f6a7b8c9d02",
            practica: "645a1b2c3d4e5f6a7b8c9d03",
            especialidad: "645a1b2c3d4e5f6a7b8c9d04",
            estado: "DISPONIBLE",
            costo: 0
        });

        await TurnoModel.create({
            fechaHora: new Date("2026-05-15T10:00:00Z"),
            medico: "550e8400-e29b-41d4-a716-446655440032",
            paciente: null,
            sede: "645a1b2c3d4e5f6a7b8c9d02",
            practica: "645a1b2c3d4e5f6a7b8c9d03",
            especialidad: "645a1b2c3d4e5f6a7b8c9d04",
            estado: "DISPONIBLE",
            costo: 1500
        });

        await TurnoModel.create({
            fechaHora: new Date("2026-05-15T11:00:00Z"),
            medico: "550e8400-e29b-41d4-a716-446655440033",
            paciente: null,
            sede: "645a1b2c3d4e5f6a7b8c9d02",
            practica: "645a1b2c3d4e5f6a7b8c9d03",
            especialidad: "645a1b2c3d4e5f6a7b8c9d04",
            estado: "DISPONIBLE",
            costo: 2500
        });

        await TurnoModel.create({
            fechaHora: new Date("2026-05-16T08:30:00Z"),
            medico: "550e8400-e29b-41d4-a716-446655440034",
            paciente: null,
            sede: "645a1b2c3d4e5f6a7b8c9d02",
            practica: "645a1b2c3d4e5f6a7b8c9d03",
            especialidad: "645a1b2c3d4e5f6a7b8c9d04",
            estado: "DISPONIBLE",
            costo: 0
        });

        await TurnoModel.create({
            fechaHora: new Date("2026-05-16T09:30:00Z"),
            medico: "550e8400-e29b-41d4-a716-446655440035",
            paciente: null,
            sede: "645a1b2c3d4e5f6a7b8c9d02",
            practica: "645a1b2c3d4e5f6a7b8c9d03",
            especialidad: "645a1b2c3d4e5f6a7b8c9d04",
            estado: "DISPONIBLE",
            costo: 3000
        });

        await TurnoModel.create({
            fechaHora: new Date("2026-05-17T14:00:00Z"),
            medico: "550e8400-e29b-41d4-a716-446655440036",
            paciente: null,
            sede: "645a1b2c3d4e5f6a7b8c9d02",
            practica: "645a1b2c3d4e5f6a7b8c9d03",
            especialidad: "645a1b2c3d4e5f6a7b8c9d04",
            estado: "DISPONIBLE",
            costo: 1200
        });
        console.log("✅ 6 Turnos creados.");
        


        // =========================================================================
        // PRACTICAS
        // =========================================================================


        await PracticaModel.create({
            id: "P001",
            codigo: "CARD-01",
            nombre: "Electrocardiograma de reposo",
            duracionTurnoEnMins: 20,
            costoConsulta: 15000
        });

        await PracticaModel.create({
            id: "P002",
            codigo: "DERM-05",
            nombre: "Dermatoscopía digital",
            duracionTurnoEnMins: 30,
            costoConsulta: 25000
        });

        await PracticaModel.create({
            id: "P003",
            codigo: "CLIN-01",
            nombre: "Consulta Médica General",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });

        await PracticaModel.create({
            id: "P004",
            codigo: "TRAU-12",
            nombre: "Infiltración articular",
            duracionTurnoEnMins: 45,
            costoConsulta: 35000
        });

        await PracticaModel.create({
            id: "P005",
            codigo: "LAB-99",
            nombre: "Análisis de sangre completo",
            duracionTurnoEnMins: 10,
            costoConsulta: 8000
        });

        await PracticaModel.create({
            id: "P006",
            codigo: "OFTAL-02",
            nombre: "Fondo de ojo",
            duracionTurnoEnMins: 20,
            costoConsulta: 12000
        });
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
