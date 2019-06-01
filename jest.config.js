module.exports = {
    roots: ['./tests'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFiles: ['./tests/__setup__/setup.ts'],
};
