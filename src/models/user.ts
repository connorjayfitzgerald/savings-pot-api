// ------------------------------- NODE MODULES -------------------------------

import { Sequelize, BuildOptions, Model, STRING, DATE } from 'sequelize';

// ------------------------------ CUSTOM MODULES ------------------------------

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

export interface UserAttributes extends Model {
    id?: number;
    forename: string;
    surname: string;
    dateOfBirth: Date;
    username: string;
    password: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type User = typeof Model & {
    new (values?: object, options?: BuildOptions): UserAttributes;
};

export const User = (sequelize: Sequelize): User => {
    const User = sequelize.define(
        'user',
        {
            forename: {
                type: STRING,
                allowNull: false,
            },
            surname: {
                type: STRING,
                allowNull: false,
            },
            dateOfBirth: {
                type: DATE,
                allowNull: false,
            },
            username: {
                type: STRING,
                allowNull: false,
            },
            password: {
                type: STRING,
                allowNull: false,
            },
            email: {
                type: STRING,
                allowNull: false,
            },
        },
        {
            defaultScope: {
                attributes: {
                    exclude: ['password'], // Hide password
                },
            },
        },
    ) as User;

    return User;
};
