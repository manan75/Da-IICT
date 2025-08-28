import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
   path: path.resolve(__dirname, '../../.env')
});

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL missing");
if (!process.env.JWT_PASSWORD) throw new Error("JWT_PASSWORD missing");
if (!process.env.FRONTEND_URL) throw new Error("FRONTEND_URL missing");

// all the secrets are stored in the .env file
export const DATABASE_URL =      process.env.DATABASE_URL;
export const PORT =              process.env.PORT;
export const JWT_PASSWORD =      process.env.JWT_PASSWORD;
export const FRONTEND_URL =      process.env.FRONTEND_URL;