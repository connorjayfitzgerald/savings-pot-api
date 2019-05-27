// ------------------------------- NODE MODULES -------------------------------

// ------------------------------ CUSTOM MODULES ------------------------------

import { logger, CustomError } from '../utils';
import { IncomingAttributes, IncomingModel } from '../models';

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

export const getIncomings = async (userId: number): Promise<IncomingAttributes[]> => {
    const logAttrs = { userId };

    logger.debug(logAttrs, 'Getting incomings');

    const incomings = await IncomingModel.findAll({
        where: {
            userId,
        },
    });

    logger.debug(logAttrs, 'Successfully retrieved incomings');

    return incomings;
};

export const getTotal = async (userId: number): Promise<{ count: number; total: number }> => {
    const logAttrs = { userId };

    logger.debug(logAttrs, 'Getting total of all incomings');

    const incomings = await getIncomings(userId);

    const total = incomings.reduce(
        (acc: number, current: IncomingAttributes): number => acc + Number(current.amount),
        0,
    );

    logger.debug(logAttrs, 'Successfully retrieved total of all incomings');

    return {
        count: incomings.length,
        total,
    };
};

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
