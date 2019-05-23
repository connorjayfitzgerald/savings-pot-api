// ------------------------------- NODE MODULES -------------------------------

import { Sequelize } from 'sequelize';

// ------------------------------ CUSTOM MODULES ------------------------------

import { dbConfig } from '../config';

import { User } from './user';

// -------------------------------- VARIABLES ---------------------------------

const { host, name, password, port, user } = dbConfig.connection;

// ----------------------------- FILE DEFINITION ------------------------------

const sequelize = new Sequelize(name, user, password, {
    host,
    port,
    dialect: 'mysql',
});

export const UserModel = User(sequelize);
export { UserAttributes } from './user';

export { sequelize };
