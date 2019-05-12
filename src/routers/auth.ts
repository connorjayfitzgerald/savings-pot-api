// ================= NODE MODULES =================

import { Router, Request, Response } from 'express';
import { body } from 'express-validator/check';
import rateLimiter from 'express-rate-limit';

// ================ CUSTOM MODULES ================

import { auth } from '../core';
import { errorHandler, checkValidation, setRouterBase } from '../utils';

// ================== VARIABLES ===================

const base = '/auth';

const router = Router();

const limiter = new rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    // message: { Need to fix the type definition
    //     errors: [
    //         {
    //             detail: 'Too many requests from this IP. Try again in 15 minutes',
    //         },
    //     ],
    // },
});

// =============== FILE DEFINITION ================

router.use(limiter);

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
            const { username, password, email } = req.body;

            const registerResult = await auth.register({ username, password, email });

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
