// ------------------------------- NODE MODULES -------------------------------

import { Op } from 'sequelize';

// ------------------------------ CUSTOM MODULES ------------------------------

import { logger, MultipleErrors } from '../utils';
import { UserModel } from '../models';

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

interface RegisterRequest {
    forename: string;
    surname: string;
    username: string;
    dateOfBirth: Date;
    email: string;
    password: string;
}

interface RegisterResponse {
    forename: string;
    surname: string;
    username: string;
    dateOfBirth: Date;
    email: string;
}

export const register = async (params: RegisterRequest): Promise<RegisterResponse> => {
    const loggAttrs = { username: params.username, email: params.email };

    logger.info(loggAttrs, 'Attempting to register user');

    const existingUsers = await UserModel.findAll({
        where: {
            [Op.or]: [{ username: params.username, email: params.email }],
        },
    });

    const duplicateUsername = existingUsers.find((user): boolean => user.username === params.username);
    const duplicateEmail = existingUsers.find((user): boolean => user.email === params.email);

    const errors = [];

    if (duplicateUsername) {
        errors.push(new Error('That username is already taken'));
    }

    if (duplicateEmail) {
        errors.push(new Error('That email address is already in use'));
    }

    if (errors.length > 0) {
        throw new MultipleErrors(errors, 409);
    }

    const newUser = await UserModel.create(params);

    logger.debug(loggAttrs, 'Successfully registered user');

    const response = {
        forename: newUser.forename,
        surname: newUser.surname,
        username: newUser.username,
        dateOfBirth: newUser.dateOfBirth,
        email: newUser.email,
    };

    return response;
};
