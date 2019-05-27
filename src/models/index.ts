// ------------------------------- NODE MODULES -------------------------------

import { Sequelize } from 'sequelize';

// ------------------------------ CUSTOM MODULES ------------------------------

import { dbConfig } from '../config';

import { Frequency } from './frequency';
import { User } from './user';
import { Incoming } from './incoming';

// -------------------------------- VARIABLES ---------------------------------

const { host, name, password, port, user } = dbConfig.connection;

// ----------------------------- FILE DEFINITION ------------------------------

const sequelize = new Sequelize(name, user, password, {
    host,
    port,
    dialect: 'mysql',
    logging: dbConfig.options.logging,
});

export const FrequencyModel = Frequency(sequelize);
export { FrequencyAttributes } from './frequency';

export const UserModel = User(sequelize);
export { UserAttributes } from './user';

export const IncomingModel = Incoming(sequelize);
export { IncomingAttributes } from './incoming';

export { sequelize };

export const initialiseData = (): void => {
    FrequencyModel.bulkCreate([
        { frequency: 'daily' },
        { frequency: 'weekly' },
        { frequency: 'fortnightly' },
        { frequency: '4 weekly' },
        { frequency: 'monthly' },
        { frequency: 'quarterly' },
        { frequency: 'annually' },
    ]);

    return;
};
