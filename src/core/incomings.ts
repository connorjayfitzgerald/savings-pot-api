// ------------------------------- NODE MODULES -------------------------------

// ------------------------------ CUSTOM MODULES ------------------------------

import { logger, CustomError } from '../utils';
import { IncomingAttributes, IncomingModel } from '../models';

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

export const createIncoming = async (userId: number, incoming: IncomingAttributes): Promise<IncomingAttributes> => {
    const logAttrs = { userId };

    logger.debug(logAttrs, 'Creating incoming');

    if (incoming.amount <= 0) {
        throw new CustomError('Incoming amount must be greater than 0', 400);
    }

    const newIncoming = await IncomingModel.create({ userId, ...incoming });

    logger.debug(logAttrs, 'Successfully created incoming');

    return newIncoming;
};
