// ------------------------------- NODE MODULES -------------------------------

import { Request, Response, NextFunction } from 'express';

// ------------------------------ CUSTOM MODULES ------------------------------

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

export default class {
    public constructor() {
        return (req: Request, res: Response, next: NextFunction): void => next();
    }
}
