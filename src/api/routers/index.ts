// ------------------------------- NODE MODULES -------------------------------

import { Express } from 'express';

// ------------------------------ CUSTOM MODULES ------------------------------

import users from './users';
import sessions from './sessions';

// -------------------------------- VARIABLES ---------------------------------

const routers = [users, sessions];

// ----------------------------- FILE DEFINITION ------------------------------

export const loadRouters = (app: Express): Express => {
    routers.forEach((router): Express => router(app));

    return app;
};
