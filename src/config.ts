import dotenv from 'dotenv';
dotenv.config()
export const {
    DATABASE_PORT,
    DATABASE_PASSWORD,
    DATABASE_NAME,
} = process.env;
