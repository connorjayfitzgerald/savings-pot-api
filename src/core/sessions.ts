// ------------------------------- NODE MODULES -------------------------------

import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import sequelize from 'sequelize';

// ------------------------------ CUSTOM MODULES ------------------------------

import { appConfig } from '../config';
import { logger, CustomError } from '../utils';
import { UserModel, UserAttributes } from '../models';

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

const cameliseName = (name: string): string => {
    let camelName = name.substr(0, 1).toUpperCase();
    camelName += name.substring(1).toLowerCase();

    return camelName;
};

const createJwt = (user: UserAttributes, expiresIn: number): string => {
    return sign(
        {
            userId: user.id,
            username: `${cameliseName(user.forename)} ${cameliseName(user.surname)}`,
        },
        appConfig.auth.key,
        {
            issuer: `${appConfig.urls.backend}/sessions`,
            subject: user.username,
            expiresIn,
        },
    );
};

interface Session {
    token: string;
    expiry: number;
}

export const createSession = async (username: string, password: string): Promise<Session> => {
    const logAttrs = { username };

    logger.debug(logAttrs, 'Attempting to create session');

    const user = await UserModel.scope('includePassword').findOne({
        where: sequelize.where(sequelize.fn('upper', sequelize.col('username')), username.toUpperCase()),
    });

    const invalidUserOrPassword = new CustomError('Invalid username or password', 401);

    if (!user) {
        logger.error(logAttrs, "User doesn't exist");

        throw invalidUserOrPassword;
    }

    const passwordCorrect = await compare(password, user.password);

    if (!passwordCorrect) {
        logger.error(logAttrs, 'Incorrect password');

        throw invalidUserOrPassword;
    }

    await UserModel.update(
        {
            lastLogin: new Date(),
        },
        {
            where: {
                username,
            },
        },
    );

    logger.debug(logAttrs, 'Successfully created session');

    const expiry = Date.now() + appConfig.auth.expiry * 1000;

    return {
        token: createJwt(user, appConfig.auth.expiry),
        expiry,
    };
};
