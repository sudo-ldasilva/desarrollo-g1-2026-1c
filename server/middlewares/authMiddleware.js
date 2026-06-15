import { createRemoteJWKSet, jwtVerify } from "jose";
import {BadRequestError} from "../errors/AppError.js";
import {UsuarioModel} from "../models/UsuarioModel.js";

//Middleware validacion de JWT emitido por logto y que llega como header en la req

let jwks;

export const authMiddleware = async (req, res, next) => {
    if (!jwks) {
        jwks = createRemoteJWKSet(new URL(process.env.LOGTO_JWKS_URL));
    }
    
    // Extract the token 
    const token = extractBearerTokenFromHeaders(req.headers);

    // console.log("AUTH HEADER:", req.headers.authorization);

    if (!token || token.split(".").length !== 3) {
        throw new BadRequestError("Invalid or missing JWT");
    }

    const { payload } = await jwtVerify(
    // The raw Bearer Token extracted from the request header
        token,
        jwks,
        {
            issuer: process.env.LOGTO_ISSUER,
            audience: process.env.LOGTO_AUDIENCE,
        }
    );

    // Sub es el user ID de logto
    const { scope, sub, username } = payload;

    // Buscar usuario local
    let usuario = await UsuarioModel.findOne({
        logtoId: sub
    });

    // Si no existe, crearlo (primera req al back del usuario)
    if (!usuario) {
        usuario = await UsuarioModel.create({
            nombreUsuario: username,
            logtoId: sub, 
            rol: "PACIENTE" //por default, los usuarios nuevos en la app son pacientes
        });
      
        //console.log("DEBUG: PACIENTE NUEVO CREADO");
    }

    // Disponibilizarlo para los controllers
    req.user = usuario;
    req.scopes = scope ? scope.split(" ") : [];

    return next();
};

const extractBearerTokenFromHeaders = ({ authorization }) => {
    if (!authorization) {
        throw new BadRequestError("Authorization header is missing");
    }
    if (!authorization.startsWith("Bearer")) {
        throw new BadRequestError("Authorization header is not in the Bearer scheme");
    }
    return authorization.slice(7); // The length of 'Bearer ' is 7
};