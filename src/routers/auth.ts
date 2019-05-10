// ================= NODE MODULES =================

import { Router, Request, Response } from 'express';
import { body } from 'express-validator/check';

// ================ CUSTOM MODULES ================

import { auth } from '../core';
import { errorHandler, checkValidation, setRouterBase } from '../utils';

// ================== VARIABLES ===================

const base = '/auth';

const router = Router();

// =============== FILE DEFINITION ================

router.post(
    '/register',
    [
        body('username')
            .isLength({ min: 8 })
            .withMessage('must be at least 8 characters'),
        body('email')
            .isEmail()
            .withMessage('must be a valid email address'),
        body('password')
            .matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$')
            .withMessage(
                'must be between 8 and 30 characters long, with a mixture of upper/lower-case letters and numbers',
            ),
    ],
    checkValidation,
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const registerResult = await auth.register(req.body);

            return res.status(200).send({ data: registerResult });
        } catch (err) {
            return errorHandler(res, err);
        }
    },
);

router.post(
    '/login',
    [
        body('username')
            .exists()
            .withMessage('must be provided'),
        body('password')
            .exists()
            .withMessage('must be provided'),
    ],
    checkValidation,
    async (req: Request, res: Response): Promise<Response> => {
        const { username, password } = req.body;

        try {
            const loginResult = await auth.login(username, password);

            return res.status(200).send({ data: loginResult });
        } catch (err) {
            return errorHandler(res, err);
        }
    },
);

export default setRouterBase(base, router);
