import jwt from "jsonwebtoken";
import { JWS_SECRET } from '../config'
import { NewUser, User } from "./interfaces/user";

const secretKey = JWS_SECRET as string

class AuthManager {
    private static instance: AuthManager;

    private constructor() { }

    static getInstance(): AuthManager {
        if (!AuthManager.instance) {
            AuthManager.instance = new AuthManager();
        }
        return AuthManager.instance;
    }
    generateToken(data: any) {
        return jwt.sign(data, secretKey, { expiresIn: "1h" });
    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, secretKey);
        } catch (error) {
            return null;
        }
    }
}

const authManager = AuthManager.getInstance();
export default authManager;