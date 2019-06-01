// ------------------------------- NODE MODULES -------------------------------

import { Express, Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

// ------------------------------ CUSTOM MODULES ------------------------------

import { appConfig } from '../../config';
import { handleError, checkValidation } from '../../utils';
import { users } from '../../core';

// -------------------------------- VARIABLES ---------------------------------

const base = '/users';

// ----------------------------- FILE DEFINITION ------------------------------

export const usersRouter = (app: Express): Express => {
    const router = Router();

    app.use(base, router);

    router.post(
        '/',
        appConfig.auth.limiter,
        [
            body('forename', 'forename must be provided').isAlpha(),
            body('surname', 'surname must be provided').isAlpha(),
            body('dateOfBirth')
                .isISO8601()
                .withMessage('dateOfBirth must be provided in ISO8601 format')
                .isBefore(new Date().toString())
                .withMessage("dateOfBirth must be prior to today's date")
                .isAfter(new Date('1900-01-01').toString())
                .withMessage('dateOfBirth must not be prior to 1900'),
            body('username')
                .isLength({ min: 8 })
                .withMessage('username must be at least 8 characters'),
            body('email')
                .isEmail()
                .withMessage('email must be a valid email address'),
            body('password')
                .matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$')
                .withMessage(
                    'password must be between 8 and 30 characters long, with a mixture of upper/lower-case letters and numbers',
                ),
        ],
        checkValidation,
        async (req: Request, res: Response): Promise<Response> => {
            try {
                const { forename, surname, username, dateOfBirth, password, email } = req.body;

                const registerResult = await users.register({
                    forename,
                    surname,
                    username,
                    dateOfBirth,
                    password,
                    email,
                });

                return res.status(201).send({ data: registerResult });
            } catch (err) {
                return handleError(err, res);
            }
        },
    );

    return app;
};
