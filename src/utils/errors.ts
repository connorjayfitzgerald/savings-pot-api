// ================= NODE MODULES =================

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';

// ================ CUSTOM MODULES ================

import { logger } from '.';

// ================== VARIABLES ===================

// =============== FILE DEFINITION ================

const SPError = class extends Error {
    public status: number;

    public constructor(message: string, status: number) {
        super(message);

        this.status = status;
    }
};

export const errors = {};

interface ValidationError {
    location?: string;
    param?: string;
    msg?: string;
}

interface ErrorObject {
    title?: string;
    detail?: string;
}

interface ErrorResponse {
    errors: ErrorObject[];
}

export const checkValidation = (req: Request, res: Response, next: NextFunction): Response | void => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        let errors: ValidationError[] = validationErrors.array();

        logger.trace(
            {
                path: req.path,
                errors,
            },
            'Request validation failed',
        );

        const response: ErrorResponse = {
            errors: errors.map(
                (error): ErrorObject => {
                    return {
                        detail: `${error.param} ${error.msg}`,
                    };
                },
            ),
        };

        return res.status(400).send(response);
    }

    return next();
};

export const errorHandler = (res: Response, err: Error): Response => {
    logger.error(err);

    let message = 'An unexpected error occurred. Please try again later.';
    let status = 500;

    if (err instanceof SPError) {
        message = err.message;
        status = err.status;
    }

    return res.status(status).send({
        errors: [
            {
                status,
                title: message,
            },
        ],
    });
};
