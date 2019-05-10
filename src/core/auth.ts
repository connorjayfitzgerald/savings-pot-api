// ================= NODE MODULES =================

// ================ CUSTOM MODULES ================

import { logger } from '../utils';

// ================== VARIABLES ===================

// =============== FILE DEFINITION ================

interface LoginResult {
    token: string;
}

export const login = async (username: string, password: string): Promise<LoginResult> => {
    logger.info({ username }, 'Attempting login');

    return {
        token: 'jwt12345',
    };
};

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export const register = async (params: RegisterRequest): Promise<void> => {
    logger.info({ username: params.username }, 'Attempting to register user');

    return;
};
