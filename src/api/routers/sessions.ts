// ------------------------------- NODE MODULES -------------------------------

import { Express, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

// ------------------------------ CUSTOM MODULES ------------------------------

import { handleError, checkValidation } from '../../utils';

// -------------------------------- VARIABLES ---------------------------------

const base = '/users';

// ----------------------------- FILE DEFINITION ------------------------------

export default (app: Express): Express => {
    const router = Router();

    app.use(base, router);

    router.post(
        '/',
        [
            body('username', 'username must be provided').exists(),
            body('password', 'password must be provided').exists(),
        ],
        checkValidation,
        async (req: Request, res: Response): Promise<Response> => {
            // const { username, password } = req.body;

            try {
                // const loginResult = await auth.login(username, password);

                return res.status(501).send();
            } catch (err) {
                return handleError(err, res);
            }
        },
    );

    return app;
};
