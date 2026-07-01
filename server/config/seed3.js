// =========================================================================
// Genera 100 medicos con datos aleatorizados
// =========================================================================
import { MedicoModel } from "../models/MedicoModel.js";
import { UsuarioModel } from "../models/UsuarioModel.js";
import { EspecialidadModel } from "../models/EspecialidadModel.js";
import { SedeModel } from "../models/SedeModel.js";
import dotenv from "dotenv";
dotenv.config();

export const runSeed = async () => {
    try {
        console.log("🌱 Iniciando Seed 3 (100 Médicos)...");

        // Limpiar colecciones para evitar duplicados
        await UsuarioModel.deleteMany({});
        await MedicoModel.deleteMany({});
        await EspecialidadModel.deleteMany({});
        await SedeModel.deleteMany({});

        // =========================================================================
        // 1. ESPECIALIDADES (Las 10 de la seed principal)
        // =========================================================================
        const especialidadesData = [
            { nombre: "Cardiología", duracionTurnoEnMins: 15, costo: 10000 },
            { nombre: "Dermatología", duracionTurnoEnMins: 15, costo: 10000 },
            { nombre: "Pediatría", duracionTurnoEnMins: 15, costo: 10000 },
            { nombre: "Traumatología", duracionTurnoEnMins: 15, costo: 10000 },
            { nombre: "Oftalmología", duracionTurnoEnMins: 15, costo: 10000 },
            { nombre: "Ginecología", duracionTurnoEnMins: 15, costo: 10000 },
            { nombre: "Neurología", duracionTurnoEnMins: 15, costo: 10000 },
            { nombre: "Psicología", duracionTurnoEnMins: 15, costo: 10000 },
            { nombre: "Clínica Médica", duracionTurnoEnMins: 15, costo: 10000 },
            { nombre: "Odontología", duracionTurnoEnMins: 15, costo: 10000 }
        ];
        const especialidades = await EspecialidadModel.insertMany(especialidadesData);

        // =========================================================================
        // 2. SEDES (Las 10 de la seed principal)
        // =========================================================================
        const sedesData = [
            { nombre: "Hospital Garrahan", direccion: "Pichincha 1891, C1240AAD CABA" },
            { nombre: "Hospital Ramos Mejía", direccion: "Urquiza 609, C1182AAD CABA" },
            { nombre: "Hospital Italiano", direccion: "Gascón 450, C1181ACH CABA" },
            { nombre: "Hospital Fernández", direccion: "Cerviño 3356, C1425GMN CABA" },
            { nombre: "Hospital Argerich", direccion: "Pi y Margall 750, C1155AAF CABA" },
            { nombre: "Hospital Durand", direccion: "Díaz Vélez 5044, C1405DCB CABA" },
            { nombre: "Hospital Pirovano", direccion: "Monroe 3555, C1428ASN CABA" },
            { nombre: "Hospital Penna", direccion: "Av. Díaz Vélez 4600, C1405DCB CABA" },
            { nombre: "Hospital Santojanni", direccion: "Pilcomayo 3650, C1207AAH CABA" },
            { nombre: "Hospital Cosme Argerich", direccion: "Av. Regimiento de Patricios 555, C1203AAQ CABA" }
        ];
        const sedes = await SedeModel.insertMany(sedesData);

        // =========================================================================
        // 3. GENERACIÓN DE 100 MÉDICOS
        // =========================================================================
        const TOTAL_MEDICOS = 100;
        
        // Arrays para generar nombres realistas con género
        const nombresMasculinos = ["Juan", "Carlos", "Luis", "Pedro", "Roberto", "Alejandro", "Mateo", "Joaquín", "Felipe", "Tomás"];
        const nombresFemeninos = ["María", "Ana", "Sofía", "Laura", "Carmen", "Valentina", "Camila", "Renata", "Miranda", "Luciana"];
        const apellidos = ["Pérez", "González", "Rodríguez", "López", "Martínez", "Sánchez", "Gómez", "Díaz", "Ruiz", "Torres", "Silva", "Ríos", "Castro", "Vargas", "Morales", "Guzmán", "Erquicia", "Vega", "Aguilar", "Ponce"];

        console.log(`👨‍⚕️ Creando ${TOTAL_MEDICOS} médicos...`);

        for (let i = 1; i <= TOTAL_MEDICOS; i++) {
            // Alternar entre nombres masculinos y femeninos
            const esMasculino = i % 2 === 1;
            const nombre = esMasculino 
                ? nombresMasculinos[Math.floor(i / 2) % nombresMasculinos.length]
                : nombresFemeninos[Math.floor(i / 2) % nombresFemeninos.length];
            const apellido = apellidos[i % apellidos.length];
            const prefijo = esMasculino ? "Dr." : "Dra.";
            const nombreCompleto = `${prefijo} ${nombre} ${apellido}`;
            const matricula = `MP-${20000 + i}`;
            
            // 🔑 CLAVE: Cada médico tiene un logtoId ÚNICO. 
            // Así el backend los trata como 100 usuarios distintos.
            const logtoId = `mock_logto_medico_${i}`; 

            // 1. Crear el Usuario base
            const usuario = await UsuarioModel.create({
                nombreUsuario: `medico${i}`,
                logtoId: logtoId,
                rol: "MEDICO"
            });

            // 2. Asignar especialidad y sedes de forma cíclica (para que haya variedad)
            const espIdx = i % especialidades.length;
            const sedIdx1 = i % sedes.length;
            const sedIdx2 = (i + 3) % sedes.length; // Segunda sede desplazada

            // 3. Crear el perfil de Médico
            await MedicoModel.create({
                usuario: usuario._id,
                matricula: matricula,
                nombre: nombreCompleto,
                especialidades: [especialidades[espIdx]._id],
                sedes: [sedes[sedIdx1]._id, sedes[sedIdx2]._id]
            });
        }

        console.log(`🎉 Seed 3 completado exitosamente. (${TOTAL_MEDICOS} médicos creados).`);
        console.log("💡 Tip: Revisá la consola para ver cómo suplantar identidades.");
    } catch (error) {
        console.error("❌ Error durante el seed:", error);
        throw error;
    }
};

// Ejecutar si se llama directamente desde consola
if (process.argv[1] && process.argv[1].includes("seed3.js")) {
    import("./db.js").then(async ({ connectDB, disconnectDB }) => {
        await connectDB();
        await runSeed();
        await disconnectDB();
        process.exit(0);
    });
}
