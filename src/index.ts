// ================= NODE MODULES =================

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

// ================ CUSTOM MODULES ================

import { logger } from './utils';
import { loadRouters } from './routers';

// ================== VARIABLES ===================

const { API_PORT } = process.env;

const app = express();

// =============== FILE DEFINITION ================

if (!API_PORT) {
    throw new Error('API_PORT must be defined!');
}

app.use(bodyParser.json());

loadRouters(app);

app.listen(API_PORT, (): void => logger.info(`Savings Pot API listening on port ${API_PORT}`));
