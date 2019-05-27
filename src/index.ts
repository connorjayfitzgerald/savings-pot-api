// ------------------------------- NODE MODULES -------------------------------

// ------------------------------ CUSTOM MODULES ------------------------------

import { logger } from './utils';
import { appConfig, dbConfig } from './config';
import { sequelize, initialiseData } from './models';
import { app } from './api';

// -------------------------------- VARIABLES ---------------------------------

const { port } = appConfig;

// ----------------------------- FILE DEFINITION ------------------------------

const run = async (): Promise<void> => {
    try {
        if (dbConfig.options.recreate) {
            await sequelize.sync({ force: true });

            await initialiseData();
        } else {
            await sequelize.sync();
        }

        app.listen(port, (): void => logger.info(`API listening on port ${port}`));
    } catch (err) {
        logger.error(err);
    }
};

run();
