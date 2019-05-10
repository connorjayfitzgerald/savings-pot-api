// ================= NODE MODULES =================

// ================ CUSTOM MODULES ================

import loggerImport from './logger';
import { Router } from 'express';

// ================== VARIABLES ===================

// =============== FILE DEFINITION ================

export * from './errors';
export const logger = loggerImport;

export const setRouterBase = (base: string, router: Router): Router => {
    const newRouter = Router();

    newRouter.use(base, router);

    return newRouter;
};
