// ------------------------------- NODE MODULES -------------------------------

import { Express, Request, Response } from 'express';

// ------------------------------ CUSTOM MODULES ------------------------------

import { incomingsRouter } from './incomings';
import { usersRouter } from './users';
import { sessionsRouter } from './sessions';
import { appConfig } from '../../config';
import { verifyJwt } from '../middlewares';

// -------------------------------- VARIABLES ---------------------------------

const insecuredRouters = [usersRouter, sessionsRouter];
const securedRouters = [incomingsRouter];

// ----------------------------- FILE DEFINITION ------------------------------

export const loadRouters = (app: Express): Express => {
    insecuredRouters.forEach((router): Express => router(app));

    app.use(verifyJwt);

    securedRouters.forEach((router): Express => router(app));

    app.get('/*', (req: Request, res: Response): void => res.redirect(appConfig.urls.frontend));

    return app;
};
