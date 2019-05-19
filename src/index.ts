// ------------------------------- NODE MODULES -------------------------------

import express from 'express';
import bodyParser from 'body-parser';

// ------------------------------ CUSTOM MODULES ------------------------------

import { logger } from './utils';
import { loadRouters } from './api/routers';
import { appConfig } from './config';
import sequelize from './models';

// -------------------------------- VARIABLES ---------------------------------

const { port } = appConfig;

// ----------------------------- FILE DEFINITION ------------------------------

const run = async (): Promise<void> => {
    try {
        await sequelize.sync();

        const app = express();

        app.use(bodyParser.json());

        loadRouters(app);

        app.listen(port, (): void => logger.info(`API listening on port ${port}`));
    } catch (err) {
        logger.error(err);
    }
};

run();
