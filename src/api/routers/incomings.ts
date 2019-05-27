// ------------------------------- NODE MODULES -------------------------------

import { Express, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

// ------------------------------ CUSTOM MODULES ------------------------------

import { checkValidation } from '../../utils';
import { createIncoming, getIncomings, getTotal } from '../../core/incomings';

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

    router.get(
        '/',
        async (req: Request, res: Response): Promise<Response> => {
            const incomings = await getIncomings(req.userId);

            return res.status(200).send({ data: incomings });
        },
    );

    router.get(
        '/total',
        async (req: Request, res: Response): Promise<Response> => {
            const total = await getTotal(req.userId);

            return res.status(200).send({ data: total });
        },
    );

    return app;
};
