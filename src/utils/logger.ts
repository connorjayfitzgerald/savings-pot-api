// ================= NODE MODULES =================

import pino from 'pino';

// ================ CUSTOM MODULES ================

// ================== VARIABLES ===================

let { LOG_LEVEL } = process.env;

// =============== FILE DEFINITION ================

let logLevelDefined = true;

if (!LOG_LEVEL) {
    logLevelDefined = false;
    LOG_LEVEL = 'debug';
}

const logger = pino({
    level: LOG_LEVEL,
    prettyPrint: true,
});

if (!logLevelDefined) {
    logger.info(`LOG_LEVEL not defined. Defaulting to 'debug'`);
}

export default logger;
