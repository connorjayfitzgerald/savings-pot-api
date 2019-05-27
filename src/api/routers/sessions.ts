// ------------------------------- NODE MODULES -------------------------------

import { Express, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

// ------------------------------ CUSTOM MODULES ------------------------------

import { appConfig } from '../../config';
import { sessions } from '../../core';
import { handleError, checkValidation } from '../../utils';

// -------------------------------- VARIABLES ---------------------------------

const base = '/sessions';

// ----------------------------- FILE DEFINITION ------------------------------

export const sessionsRouter = (app: Express): Express => {
    const router = Router();

    app.use(base, router);
    app.use(appConfig.auth.limiter);

    router.post(
        '/',
        [
            body('username', 'username must be provided').exists(),
            body('password', 'password must be provided').exists(),
        ],
        checkValidation,
        async (req: Request, res: Response): Promise<Response> => {
            const { username, password } = req.body;

            try {
                const session = await sessions.createSession(username, password);

                res.set({
                    'Cache-Control': 'no-store',
                    Pragma: 'no-cache',
                });

                res.cookie('jwt', session.token, { secure: true, httpOnly: true, expires: new Date(session.expiry) });

                return res.status(201).send();
            } catch (err) {
                return handleError(err, res);
            }
        },
    );

    return app;
};
