// ------------------------------- NODE MODULES -------------------------------

import sequelize, { Op } from 'sequelize';
import { hash } from 'bcrypt';

// ------------------------------ CUSTOM MODULES ------------------------------

import { logger, MultipleErrors, CustomError } from '../utils';
import { UserModel } from '../models';

// -------------------------------- VARIABLES ---------------------------------

sequelize.fn;
const saltRounds = 12;

// ----------------------------- FILE DEFINITION ------------------------------

export const usersErrors = {
    emailTaken: new CustomError('That email address is already in use', 409),
    usernameTaken: new CustomError('That username is already taken', 409),
};

export interface RegisterRequest {
    forename: string;
    surname: string;
    username: string;
    dateOfBirth: Date;
    email: string;
    password: string;
}

export interface RegisterResponse {
    forename: string;
    surname: string;
    username: string;
    dateOfBirth: Date;
    email: string;
}

export const register = async (params: RegisterRequest): Promise<RegisterResponse> => {
    const logAttrs = { username: params.username, email: params.email };

    logger.info(logAttrs, 'Attempting to register user');

    const uppercaseUsername = params.username.toUpperCase();
    const uppercaseEmail = params.email.toUpperCase();

    const existingUsers = await UserModel.findAll({
        where: {
            [Op.or]: [
                sequelize.where(sequelize.fn('upper', sequelize.col('username')), uppercaseUsername),
                sequelize.where(sequelize.fn('upper', sequelize.col('email')), uppercaseEmail),
            ],
        },
    });

    const duplicateUsername = existingUsers.find((user): boolean => user.username.toUpperCase() === uppercaseUsername);
    const duplicateEmail = existingUsers.find((user): boolean => user.email.toUpperCase() === uppercaseEmail);

    const errors = [];

    if (duplicateUsername) {
        errors.push(usersErrors.usernameTaken);
    }

    if (duplicateEmail) {
        errors.push(usersErrors.emailTaken);
    }

    if (errors.length > 0) {
        throw new MultipleErrors(errors, 409);
    }

    params.password = await hash(params.password, saltRounds);

    const newUser = await UserModel.create(params);

    logger.debug(logAttrs, 'Successfully registered user');

    const response = {
        id: newUser.id,
        forename: newUser.forename,
        surname: newUser.surname,
        username: newUser.username,
        dateOfBirth: newUser.dateOfBirth,
        email: newUser.email,
    };

    return response;
};
