// ------------------------------- NODE MODULES -------------------------------

import { LoggerOptions } from 'pino';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

// ------------------------------ CUSTOM MODULES ------------------------------

// -------------------------------- VARIABLES ---------------------------------

const {
    API_PORT,
    AUTH_EXPIRY,
    AUTH_KEY,
    AUTH_LIMIT_MAX,
    AUTH_LIMIT_SECS,
    LOG_LEVEL,
    LOG_PRETTY,
    DB_ENABLE_LOG,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_RECREATE,
    DB_USER,
    URL_BACKEND,
    URL_FRONTEND,
} = process.env;

// ----------------------------- FILE DEFINITION ------------------------------

const requiredVariables = ['AUTH_KEY', 'API_PORT', 'DB_NAME', 'DB_PASSWORD', 'DB_USER', 'URL_BACKEND', 'URL_FRONTEND'];
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

if ((URL_BACKEND && URL_BACKEND.endsWith('/')) || (URL_FRONTEND && URL_FRONTEND.endsWith('/'))) {
    throw new Error('FRONTEND and BACKEND URLs must not end with /');
}

const limiter = rateLimit({
    windowMs: AUTH_LIMIT_SECS ? parseInt(AUTH_LIMIT_SECS) * 1000 : 15 * 60 * 1000, // 15 minutes
    max: AUTH_LIMIT_MAX ? parseInt(AUTH_LIMIT_MAX) : 10, // limit each IP to 100 requests per windowMs
});

export const appConfig = {
    auth: {
        expiry: AUTH_EXPIRY ? parseInt(AUTH_EXPIRY) : 60,
        key: AUTH_KEY || '',
        limiter,
    },
    port: API_PORT,
    urls: {
        backend: URL_BACKEND || '',
        frontend: URL_FRONTEND || '',
    },
};

export const dbConfig = {
    connection: {
        host: DB_HOST || 'localhost',
        name: DB_NAME || '',
        password: DB_PASSWORD,
        port: DB_PORT ? parseInt(DB_PORT) : 3306,
        user: DB_USER || '',
    },
    options: {
        logging: DB_ENABLE_LOG === 'true' || false,
        recreate: DB_RECREATE === 'true',
    },
};

export const loggerConfig: LoggerOptions = {
    level: LOG_LEVEL || 'debug',
    prettyPrint: LOG_PRETTY === 'false',
};
