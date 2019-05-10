// ================= NODE MODULES =================

import { Express, Router } from 'express';

// ================ CUSTOM MODULES ================

import auth from './auth';

// ================== VARIABLES ===================

// =============== FILE DEFINITION ================

export const routers = [auth];

export const loadRouters = (app: Express): void => {
    routers.forEach((router: Router): Express => app.use(router));

    return;
};
