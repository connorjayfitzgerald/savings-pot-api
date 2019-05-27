// ------------------------------- NODE MODULES -------------------------------

// ------------------------------ CUSTOM MODULES ------------------------------

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

export {};

declare global {
    namespace Express {
        interface Request {
            userId: number;
            username: string;
        }
    }
}
