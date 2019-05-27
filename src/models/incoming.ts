// ------------------------------- NODE MODULES -------------------------------

import { Sequelize, BuildOptions, Model, STRING, DECIMAL, DATE, BOOLEAN, INTEGER } from 'sequelize';

// ------------------------------ CUSTOM MODULES ------------------------------

import { FrequencyModel, UserModel } from '.';

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

export interface IncomingAttributes extends Model {
    id?: number;
    amount: number;
    frequency: string;
    salary: boolean;
    startDate: Date;
    endDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

type Incoming = typeof Model & {
    new (values?: object, options?: BuildOptions): IncomingAttributes;
};

export const Incoming = (sequelize: Sequelize): Incoming => {
    const Incoming = sequelize.define('incoming', {
        userId: {
            type: INTEGER,
            references: {
                key: 'id',
                model: UserModel,
            },
            allowNull: false,
        },
        amount: {
            type: DECIMAL(7, 2),
            allowNull: false,
        },
        frequency: {
            type: STRING,
            allowNull: false,
            references: {
                key: 'frequency',
                model: FrequencyModel,
            },
        },
        salary: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        startDate: {
            type: DATE,
            allowNull: false,
            defaultValue: new Date(),
        },
        endDate: {
            type: DATE,
            allowNull: true,
        },
    }) as Incoming;

    return Incoming;
};
