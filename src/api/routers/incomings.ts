// ------------------------------- NODE MODULES -------------------------------

import { Express, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

// ------------------------------ CUSTOM MODULES ------------------------------

import { checkValidation } from '../../utils';
import { createIncoming } from '../../core/incomings';

// -------------------------------- VARIABLES ---------------------------------

const base = '/incomings';

// ----------------------------- FILE DEFINITION ------------------------------

export const incomingsRouter = (app: Express): Express => {
    const router = Router();

    app.use(base, router);

    router.post(
        '/',
        [
            body('amount', 'incoming amount must be greater than 0.00').isNumeric(),
            body('frequency', 'frequency must be provided').exists(),
        ],
        checkValidation,
        async (req: Request, res: Response): Promise<Response> => {
            const incoming = await createIncoming(req.userId, req.body);

            return res.status(201).send({ data: incoming });
        },
    );

    return app;
};
