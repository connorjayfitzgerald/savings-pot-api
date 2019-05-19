// ------------------------------- NODE MODULES -------------------------------

import { LoggerOptions } from 'pino';
import dotenv from 'dotenv';

dotenv.config();

// ------------------------------ CUSTOM MODULES ------------------------------

// -------------------------------- VARIABLES ---------------------------------

const { API_PORT, LOG_LEVEL, LOG_PRETTY, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = process.env;

// ----------------------------- FILE DEFINITION ------------------------------

const requiredVariables = ['API_PORT', 'DB_NAME', 'DB_PASSWORD', 'DB_USER'];
const missingVariables: string[] = [];

requiredVariables.forEach(
    (variable: string): void => {
        if (!process.env[variable]) {
            missingVariables.push(variable);
        }
    },
);

if (missingVariables.length > 0) {
    throw new Error(`Missing mandatory environment variables: ${missingVariables.join(', ')}`);
}

export const appConfig = { port: API_PORT };

export const dbConfig = {
    connection: {
        host: DB_HOST || 'localhost',
        name: DB_NAME || '',
        password: DB_PASSWORD,
        port: DB_PORT ? parseInt(DB_PORT) : 3306,
        user: DB_USER || '',
    },
};

export const loggerConfig: LoggerOptions = {
    level: LOG_LEVEL || 'debug',
    prettyPrint: LOG_PRETTY === 'false',
};
