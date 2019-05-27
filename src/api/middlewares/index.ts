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
            logger.debug('Invalid authorization token');
        }
    }

    return handleError(new CustomError('Invalid authorization token', 401), res);
};
