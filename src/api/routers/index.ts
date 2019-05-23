// ------------------------------- NODE MODULES -------------------------------

import { Express } from 'express';

// ------------------------------ CUSTOM MODULES ------------------------------

import { usersRouter } from './users';
import { sessionsRouter } from './sessions';

// -------------------------------- VARIABLES ---------------------------------

const routers = [usersRouter, sessionsRouter];

// ----------------------------- FILE DEFINITION ------------------------------

export const loadRouters = (app: Express): Express => {
    routers.forEach((router): Express => router(app));

    return app;
};
