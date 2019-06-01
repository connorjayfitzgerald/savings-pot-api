// ------------------------------- NODE MODULES -------------------------------

import request, { Test } from 'supertest';

// ------------------------------ CUSTOM MODULES ------------------------------

import * as usersBase from '../../src/core/users';
import { app } from '../../src/api';

// -------------------------------- VARIABLES ---------------------------------

const users = usersBase as jest.Mocked<typeof usersBase>;

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
    const registerResponse = {
        ...validRegisterRequest,
        dateOfBirth: new Date(validRegisterRequest.dateOfBirth),
    };

    delete registerResponse.password;

    users.register.mockResolvedValue(registerResponse);

    const response = await request(app)
        .post('/users')
        .send(validRegisterRequest)
        .expect(201);

    expect(response.body).toMatchObject({
        data: { ...registerResponse, dateOfBirth: registerResponse.dateOfBirth.toISOString() },
    });
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
                    .expect(400),
            ),
    );

    await Promise.all(attempts);
});

test('Date of birth must be valid ISO date in sensible range', async (): Promise<void> => {
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

test('Email must be a valid email address', async (): Promise<void> => {
    const inputs = [
        { ...validRegisterRequest, email: 'fakedate' },
        { ...validRegisterRequest, email: 'test@test@test.com' },
        { ...validRegisterRequest, email: 'hello.com' },
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

test('Password must be mixed case with numbers', async (): Promise<void> => {
    const inputs = [
        { ...validRegisterRequest, password: 'easypassword' },
        { ...validRegisterRequest, password: 'ReallyeasyPassword' },
        { ...validRegisterRequest, password: 'ReallyeasyPassword!!#' },
        { ...validRegisterRequest, password: '123456789012345678901234567890Abc£' },
        { ...validRegisterRequest, password: 'aB!' },
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

test('Error when registering returns 500', async (): Promise<void> => {
    users.register.mockRejectedValue(new Error('Something terrible happened'));

    await request(app)
        .post('/users')
        .send(validRegisterRequest)
        .expect(500);
});
