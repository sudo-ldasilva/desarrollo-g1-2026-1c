// server/config/seed.js
// Crea usuarios, médicos, pacientes, especialidades, turnos, etc
// Facilita enormemente el testing porque todos trabajamos sobre los mismos datos

// Crea usuarios, médicos, pacientes, especialidades, turnos, etc
// Facilita enormemente el testing porque todos trabajamos sobre los mismos datos

// Importar modelos registrados en Mongoose
import mongoose from "mongoose";
import {EspecialidadModel} from "../../../server/models/EspecialidadModel.js";
import {MedicoModel} from "../../../server/models/MedicoModel.js";
import {NotificacionModel} from "../../../server/models/NotificacionModel.js";
import {PacienteModel} from "../../../server/models/PacienteModel.js";
import {PracticaModel} from "../../../server/models/PracticaModel.js";
import {SedeModel} from "../../../server/models/SedeModel.js";
import {TurnoModel} from "../../../server/models/TurnoModel.js";
import {UsuarioModel} from "../../../server/models/UsuarioModel.js";
import dotenv from "dotenv";
dotenv.config();


export const runSeed = async () => {
    try {

        // 1. Limpiar colecciones
        await UsuarioModel.deleteMany({});
        await EspecialidadModel.deleteMany({});
        await MedicoModel.deleteMany({});
        await SedeModel.deleteMany({});
        await PacienteModel.deleteMany({});
        await PracticaModel.deleteMany({});
        await TurnoModel.deleteMany({});
        await NotificacionModel.deleteMany({});

        // =========================================================================
        // 2. ESPECIALIDADES (10 registros)
        // =========================================================================

        // Capturamos las referencias para usar sus _id automáticos después
        const cardiologia = await EspecialidadModel.create({
            _id: new mongoose.Types.ObjectId("000000000000000000000001"),
            nombre: "Cardiología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        const dermatologia = await EspecialidadModel.create({
            _id: new mongoose.Types.ObjectId("000000000000000000000002"),
            nombre: "Dermatología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        const pediatria = await EspecialidadModel.create({
            _id: new mongoose.Types.ObjectId("000000000000000000000003"),
            nombre: "Pediatría",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        const traumatologia = await EspecialidadModel.create({
            _id: new mongoose.Types.ObjectId("000000000000000000000004"),
            nombre: "Traumatología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        const oftalmologia = await EspecialidadModel.create({
            _id: new mongoose.Types.ObjectId("000000000000000000000005"),
            nombre: "Oftalmología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        const ginecologia = await EspecialidadModel.create({
            _id: new mongoose.Types.ObjectId("000000000000000000000006"),
            nombre: "Ginecología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        const neurologia = await EspecialidadModel.create({
            _id: new mongoose.Types.ObjectId("000000000000000000000007"),
            nombre: "Neurología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        const psicologia = await EspecialidadModel.create({
            _id: new mongoose.Types.ObjectId("000000000000000000000008"),
            nombre: "Psicología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        const clinicaMedica = await EspecialidadModel.create({
            _id: new mongoose.Types.ObjectId("000000000000000000000009"),
            nombre: "Clínica Médica",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });
        const odontologia = await EspecialidadModel.create({
            _id: new mongoose.Types.ObjectId("00000000000000000000000a"),
            nombre: "Odontología",
            duracionTurnoEnMins: 15,
            costoConsulta: 10000
        });


        // =========================================================================
        // 3. USUARIOS (20 registros: 10 para médicos, 10 para pacientes)
        // =========================================================================

        // Capturamos referencias de usuarios para usar sus _id después
        const usuariosMedicos = [];
        for (let i = 1; i <= 10; i++) {
            const user = await UsuarioModel.create({
                _id: new mongoose.Types.ObjectId(`10000000000000000000000${i.toString(16)}`.slice(-24)),
                nombreUsuario: `medico${i}`,
                password: `hash_simulado_med${i}_sha256`
            });
            usuariosMedicos.push(user);
        }

        const usuariosPacientes = [];
        for (let i = 1; i <= 10; i++) {
            const user = await UsuarioModel.create({
                _id: new mongoose.Types.ObjectId(`20000000000000000000000${i.toString(16)}`.slice(-24)),
                nombreUsuario: `paciente${i}`,
                password: `hash_simulado_pac${i}_sha256`
            });
            usuariosPacientes.push(user);
        }


        // =========================================================================
        // 4. SEDES (10 registros - Hospitales CABA)
        // =========================================================================

        // Capturamos referencias de sedes para usar sus _id después
        const garrahan = await SedeModel.create({
            _id: new mongoose.Types.ObjectId("300000000000000000000001"),
            nombre: "Hospital Garrahan",
            direccion: "Pichincha 1891, C1240AAD CABA"
        });
        const ramosMejia = await SedeModel.create({
            _id: new mongoose.Types.ObjectId("300000000000000000000002"),
            nombre: "Hospital Ramos Mejía",
            direccion: "Urquiza 609, C1182AAD CABA"
        });
        const italiano = await SedeModel.create({
            _id: new mongoose.Types.ObjectId("300000000000000000000003"),
            nombre: "Hospital Italiano",
            direccion: "Gascón 450, C1181ACH CABA"
        });
        const fernandez = await SedeModel.create({
            _id: new mongoose.Types.ObjectId("300000000000000000000004"),
            nombre: "Hospital Fernández",
            direccion: "Cerviño 3356, C1425GMN CABA"
        });
        const argerich = await SedeModel.create({
            _id: new mongoose.Types.ObjectId("300000000000000000000005"),
            nombre: "Hospital Argerich",
            direccion: "Pi y Margall 750, C1155AAF CABA"
        });
        const durand = await SedeModel.create({
            _id: new mongoose.Types.ObjectId("300000000000000000000006"),
            nombre: "Hospital Durand",
            direccion: "Díaz Vélez 5044, C1405DCB CABA"
        });
        const pirovano = await SedeModel.create({
            _id: new mongoose.Types.ObjectId("300000000000000000000007"),
            nombre: "Hospital Pirovano",
            direccion: "Monroe 3555, C1428ASN CABA"
        });
        const penna = await SedeModel.create({
            _id: new mongoose.Types.ObjectId("300000000000000000000008"),
            nombre: "Hospital Penna",
            direccion: "Av. Díaz Vélez 4600, C1405DCB CABA"
        });
        const santojanni = await SedeModel.create({
            _id: new mongoose.Types.ObjectId("300000000000000000000009"),
            nombre: "Hospital Santojanni",
            direccion: "Pilcomayo 3650, C1207AAH CABA"
        });
        const cosmeArgerich = await SedeModel.create({
            _id: new mongoose.Types.ObjectId("30000000000000000000000a"),
            nombre: "Hospital Cosme Argerich",
            direccion: "Av. Regimiento de Patricios 555, C1203AAQ CABA"
        });

        // =========================================================================
        // PRÁCTICAS (3 registros) - para turnos que no sean de Especialidad
        // =========================================================================
        const practicaRx = await PracticaModel.create({
            _id: new mongoose.Types.ObjectId("400000000000000000000001"),
            codigo: "P-001",
            nombre: "Rx Tórax",
            duracionTurnoEnMins: 15,
            costo: 5000
        });
        const practicaECG = await PracticaModel.create({
            _id: new mongoose.Types.ObjectId("400000000000000000000002"),
            codigo: "P-002",
            nombre: "Electrocardiograma",
            duracionTurnoEnMins: 20,
            costo: 8000
        });

        // =========================================================================
        // 5. MÉDICOS (10 registros)
        // =========================================================================

        // Usamos los _id automáticos capturados de especialidades y usuarios
        await MedicoModel.create({
            _id: new mongoose.Types.ObjectId("500000000000000000000001"),
            usuario: usuariosMedicos[0]._id, // ObjectId, no string
            matricula: "MP-1001",
            nombre: "Dr. Juan Pérez",
            especialidades: [cardiologia._id], // Array de ObjectId válidos
            sedes: [italiano._id, santojanni._id]
        });
        await MedicoModel.create({
            _id: new mongoose.Types.ObjectId("500000000000000000000002"),
            usuario: usuariosMedicos[1]._id,
            matricula: "MP-1002",
            nombre: "Dra. María González",
            especialidades: [dermatologia._id],
            sedes: [cosmeArgerich._id, santojanni._id]
        });
        await MedicoModel.create({
            _id: new mongoose.Types.ObjectId("500000000000000000000003"),
            usuario: usuariosMedicos[2]._id,
            matricula: "MP-1003",
            nombre: "Dr. Carlos Rodríguez",
            especialidades: [pediatria._id],
            sedes: [cosmeArgerich._id, santojanni._id]
        });
        await MedicoModel.create({
            _id: new mongoose.Types.ObjectId("500000000000000000000004"),
            usuario: usuariosMedicos[3]._id,
            matricula: "MP-1004",
            nombre: "Dra. Ana López",
            especialidades: [traumatologia._id],
            sedes: [santojanni._id]
        });
        await MedicoModel.create({
            _id: new mongoose.Types.ObjectId("500000000000000000000005"),
            usuario: usuariosMedicos[4]._id,
            matricula: "MP-1005",
            nombre: "Dr. Luis Martínez",
            especialidades: [oftalmologia._id],
            sedes: [ramosMejia._id]
        });
        await MedicoModel.create({
            _id: new mongoose.Types.ObjectId("500000000000000000000006"),
            usuario: usuariosMedicos[5]._id,
            matricula: "MP-1006",
            nombre: "Dra. Sofía Sánchez",
            especialidades: [ginecologia._id],
            sedes: [durand._id, pirovano._id, penna._id]
        });
        await MedicoModel.create({
            _id: new mongoose.Types.ObjectId("500000000000000000000007"),
            usuario: usuariosMedicos[6]._id,
            matricula: "MP-1007",
            nombre: "Dr. Pedro Gómez",
            especialidades: [neurologia._id],
            sedes: [italiano._id, argerich._id]
        });
        await MedicoModel.create({
            _id: new mongoose.Types.ObjectId("500000000000000000000008"),
            usuario: usuariosMedicos[7]._id,
            matricula: "MP-1008",
            nombre: "Dra. Laura Díaz",
            especialidades: [psicologia._id],
            sedes: [italiano._id, ramosMejia._id]
        });
        await MedicoModel.create({
            _id: new mongoose.Types.ObjectId("500000000000000000000009"),
            usuario: usuariosMedicos[8]._id,
            matricula: "MP-1009",
            nombre: "Dr. Roberto Ruiz",
            especialidades: [clinicaMedica._id],
            sedes: [ramosMejia._id]
        });
        await MedicoModel.create({
            _id: new mongoose.Types.ObjectId("50000000000000000000000a"),
            usuario: usuariosMedicos[9]._id,
            matricula: "MP-1010",
            nombre: "Dra. Carmen Torres",
            especialidades: [odontologia._id],
            sedes: [garrahan._id, fernandez._id]
        });

        // =========================================================================
        // 6. PACIENTES (20 registros)
        // =========================================================================

        // Pacientes 1-10
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000001"),
            usuario: usuariosPacientes[0]._id, // 🔹 ObjectId
            dni: 10000000,
            nombre: "Lucía Fernández"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000002"),
            usuario: usuariosPacientes[1]._id,
            dni: 10000001,
            nombre: "Martín Silva"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000003"),
            usuario: usuariosPacientes[2]._id,
            dni: 10000002,
            nombre: "Valeria Romero"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000004"),
            usuario: usuariosPacientes[3]._id,
            dni: 10000003,
            nombre: "Jorge Álvarez"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000005"),
            usuario: usuariosPacientes[4]._id,
            dni: 10000004,
            nombre: "Camila Morales"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000006"),
            usuario: usuariosPacientes[5]._id,
            dni: 10000005,
            nombre: "Diego Castro"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000007"),
            usuario: usuariosPacientes[6]._id,
            dni: 10000006,
            nombre: "Juliana Ortiz"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000008"),
            usuario: usuariosPacientes[7]._id,
            dni: 10000007,
            nombre: "Federico Gómez"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000009"),
            usuario: usuariosPacientes[8]._id,
            dni: 10000008,
            nombre: "Agustina Herrera"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("60000000000000000000000a"),
            usuario: usuariosPacientes[9]._id,
            dni: 10000009,
            nombre: "Nicolás Vargas"
        });

        // Pacientes 11-20
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("60000000000000000000000b"),
            usuario: usuariosPacientes[0]._id,
            dni: 10000010,
            nombre: "Sofía Medina"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("60000000000000000000000c"),
            usuario: usuariosPacientes[1]._id,
            dni: 10000011,
            nombre: "Mateo Aguilar"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("60000000000000000000000d"),
            usuario: usuariosPacientes[2]._id,
            dni: 10000012,
            nombre: "Isabella Rojas"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("60000000000000000000000e"),
            usuario: usuariosPacientes[3]._id,
            dni: 10000013,
            nombre: "Santiago Molina"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("60000000000000000000000f"),
            usuario: usuariosPacientes[4]._id,
            dni: 10000014,
            nombre: "Mia Delgado"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000010"),
            usuario: usuariosPacientes[5]._id,
            dni: 10000015,
            nombre: "Benjamín Paz"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000011"),
            usuario: usuariosPacientes[6]._id,
            dni: 10000016,
            nombre: "Emma Figueroa"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000012"),
            usuario: usuariosPacientes[7]._id,
            dni: 10000017,
            nombre: "Thiago Cabrera"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000013"),
            usuario: usuariosPacientes[8]._id,
            dni: 10000018,
            nombre: "Olivia Núñez"
        });
        await PacienteModel.create({
            _id: new mongoose.Types.ObjectId("600000000000000000000014"),
            usuario: usuariosPacientes[9]._id,
            dni: 10000019,
            nombre: "Liam Acosta"
        });

        // =========================================================================
        // 7. TURNOS (6 registros) y NOTIFICACIONES (5 registros)
        // =========================================================================

        // Traemos referencias útiles
        const medicos = await MedicoModel.find();
        const pacientes = await PacienteModel.find();

        // Crear 6 turnos usando algunas especialidades ya creadas
        await TurnoModel.create({
            _id: new mongoose.Types.ObjectId("700000000000000000000001"),
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
            _id: new mongoose.Types.ObjectId("700000000000000000000002"),
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
            _id: new mongoose.Types.ObjectId("700000000000000000000003"),
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
            _id: new mongoose.Types.ObjectId("700000000000000000000004"),
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
            _id: new mongoose.Types.ObjectId("700000000000000000000005"),
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
            _id: new mongoose.Types.ObjectId("700000000000000000000006"),
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



        // Crear 5 notificaciones simples
        await NotificacionModel.create({
            _id: new mongoose.Types.ObjectId("800000000000000000000001"),
            destinatario: usuariosPacientes[0]._id,
            remitente: usuariosMedicos[0]._id,
            mensaje: "Recordatorio: tiene un turno reservado mañana a las 10:00.",
            fechaHoraCreacion: new Date(),
            leida: false
        });

        await NotificacionModel.create({
            _id: new mongoose.Types.ObjectId("800000000000000000000002"),
            destinatario: usuariosPacientes[1]._id,
            remitente: usuariosMedicos[1]._id,
            mensaje: "Su turno ha sido confirmado.",
            fechaHoraCreacion: new Date(),
            leida: false
        });

        await NotificacionModel.create({
            _id: new mongoose.Types.ObjectId("800000000000000000000003"),
            destinatario: usuariosMedicos[2]._id,
            remitente: usuariosPacientes[2]._id,
            mensaje: "El paciente solicitó reprogramar el turno.",
            fechaHoraCreacion: new Date(),
            leida: true,
            fechaHoraLeida: new Date()
        });

        await NotificacionModel.create({
            _id: new mongoose.Types.ObjectId("800000000000000000000004"),
            destinatario: usuariosPacientes[3]._id,
            remitente: usuariosMedicos[3]._id,
            mensaje: "Su turno fue cancelado por la institución.",
            fechaHoraCreacion: new Date(),
            leida: false
        });

        await NotificacionModel.create({
            _id: new mongoose.Types.ObjectId("800000000000000000000005"),
            destinatario: usuariosPacientes[4]._id,
            remitente: usuariosMedicos[4]._id,
            mensaje: "Gracias por asistir. Por favor complete la encuesta.",
            fechaHoraCreacion: new Date(),
            leida: false
        });
    } catch (error) {
        console.error("❌ Error durante el seed:", error);
        throw error;
    }
};

// Ejecutar si se llama directamente desde consola
// if (process.argv[1] && process.argv[1].includes("seed.js")) {
//     import("./db.js").then(async ({ connectDB, disconnectDB }) => {
//         await connectDB();
//         await runSeed();
//         await disconnectDB();
//         process.exit(0);
//     });
// }
