// ------------------------------- NODE MODULES -------------------------------

// ------------------------------ CUSTOM MODULES ------------------------------

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

process.env = {
    ...process.env,
    AUTH_KEY: 'FAKE',
    API_PORT: '-1',
    DB_NAME: 'FAKE',
    DB_PASSWORD: 'FAKE',
    DB_USER: 'FAKE',
    LOG_LEVEL: 'fatal',
    URL_BACKEND: 'FAKE',
    URL_FRONTEND: 'FAKE',
};
