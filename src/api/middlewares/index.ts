// ------------------------------- NODE MODULES -------------------------------

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// ------------------------------ CUSTOM MODULES ------------------------------

import { appConfig } from '../../config';
import { handleError, CustomError, logger } from '../../utils';

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
    logger.debug(
        {
            path: req.path,
            host: req.hostname,
            method: req.method,
        },
        'Request received',
    );

    return next();
};

export const verifyJwt = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { jwt } = req.cookies;

    if (jwt) {
        try {
            const verifiedToken = verify(jwt, appConfig.auth.key) as Record<string, any>;

            req.userId = verifiedToken.userId;
            req.username = verifiedToken.username;

            return next();
        } catch (err) {
            return handleError(new CustomError('Invalid authorization token', 401), res);
        }
    }

    if (req.method === 'GET') {
        return res.redirect(appConfig.urls.frontend);
    }

    return handleError(new CustomError('No authorization token provided', 400), res);
};
