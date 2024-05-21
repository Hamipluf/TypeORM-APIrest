import dotenv from 'dotenv';
dotenv.config()

export const {
    DATABASE_PORT,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_USERNAME,
    JWS_SECRET,
} = process.env;

