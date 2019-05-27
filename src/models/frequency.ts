// ------------------------------- NODE MODULES -------------------------------

import { Sequelize, BuildOptions, Model, STRING } from 'sequelize';

// ------------------------------ CUSTOM MODULES ------------------------------

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

export interface FrequencyAttributes extends Model {
    id?: number;
    frequency: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type Frequency = typeof Model & {
    new (values?: object, options?: BuildOptions): FrequencyAttributes;
};

export const Frequency = (sequelize: Sequelize): Frequency => {
    const Frequency = sequelize.define('frequency', {
        frequency: {
            type: STRING,
            allowNull: false,
            primaryKey: true,
        },
    }) as Frequency;

    return Frequency;
};
