// ------------------------------- NODE MODULES -------------------------------

import request, { Test } from 'supertest';

// ------------------------------ CUSTOM MODULES ------------------------------

import { app } from '../../src/api';

// -------------------------------- VARIABLES ---------------------------------

// ----------------------------- FILE DEFINITION ------------------------------

jest.mock('../../src/core/users.ts');
jest.mock('express-rate-limit');

const validRegisterRequest = {
    forename: 'Connor',
    surname: 'Fitzgerald',
    dateOfBirth: '1995-12-25',
    email: 'realemail@aol.com',
    username: 'validusername',
    password: 'Rea!!yValidPa55word',
};

test('Ensure test data is valid', async (): Promise<void> => {
    await request(app)
        .post('/users')
        .send(validRegisterRequest)
        .expect(201);
});

test('Missing values on register throws 400', async (): Promise<void> => {
    const inputs = [
        { ...validRegisterRequest, forename: null },
        { ...validRegisterRequest, surname: null },
        { ...validRegisterRequest, dateOfBirth: null },
        { ...validRegisterRequest, email: null },
        { ...validRegisterRequest, username: null },
        { ...validRegisterRequest, password: null },
    ];

    const attempts: Test[] = [];

    inputs.forEach(
        (input: typeof inputs[0]): number =>
            attempts.push(
                request(app)
                    .post('/users')
                    .send(input)
                    .expect(401),
            ),
    );

    await Promise.all(attempts);
});

test('Date of birth is valid ISO date in sensible range', async (): Promise<void> => {
    const inputs = [
        { ...validRegisterRequest, dateOfBirth: '12-JAN-1995' },
        { ...validRegisterRequest, dateOfBirth: 'fakedate' },
        { ...validRegisterRequest, dateOfBirth: '1802-12-25' },
        { ...validRegisterRequest, dateOfBirth: '2020-12-25' },
    ];

    const attempts: Test[] = [];

    inputs.forEach(
        (input: typeof inputs[0]): number =>
            attempts.push(
                request(app)
                    .post('/users')
                    .send(input)
                    .expect(400),
            ),
    );

    await Promise.all(attempts);
});
