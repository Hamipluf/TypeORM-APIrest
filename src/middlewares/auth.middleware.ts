import { NextFunction, Request, Response } from "express";
import { JWS_SECRET } from "../config";
import jwt from 'jsonwebtoken'
const secret_key = JWS_SECRET as string
export const authMIddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Falta el header de autorización o no es válido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedUser = jwt.verify(token, secret_key);
        // @ts-expect-error "Necesito tipado"
        req.user = decodedUser; // Asigno el user al objeto de request para acceder despues
    } catch (error) {
        return res.status(401).json({ error: 'JWT token invalido' });
    }

    next();
};
