// ------------------------------- NODE MODULES -------------------------------

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// ------------------------------ CUSTOM MODULES ------------------------------

import { loadRouters } from './routers';
import { logRequest } from './middlewares';

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

export const app = express();

app.use(helmet());
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logRequest);

loadRouters(app);
