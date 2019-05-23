// ------------------------------- NODE MODULES -------------------------------

import { Express, Request, Response } from 'express';

// ------------------------------ CUSTOM MODULES ------------------------------

import { usersRouter } from './users';
import { sessionsRouter } from './sessions';

// -------------------------------- VARIABLES ---------------------------------

const routers = [usersRouter, sessionsRouter];

// ----------------------------- FILE DEFINITION ------------------------------

export const loadRouters = (app: Express): Express => {
    routers.forEach((router): Express => router(app));

    app.get('/*', (req: Request, res: Response): void => res.redirect('https://connorfitzgerald.co.uk'));

    return app;
};
