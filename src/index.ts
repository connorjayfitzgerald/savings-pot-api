// ================= NODE MODULES =================

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
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

app.enable('trust proxy');
app.use(bodyParser.json());
app.use(helmet());

loadRouters(app);

app.use((req, res) => res.redirect('http://connorfitzgerald.co.uk'));

app.listen(API_PORT, (): void => logger.info(`Savings Pot API listening on port ${API_PORT}`));
