import 'dotenv/config';
import request from 'supertest';

import app from '../../app.js';
import { db_connection } from '../../db/db_connection.js';
import sequelize from '../../db/sequelize.js';
import { findUser } from '../../services/authServices.js';
import { registerUser } from '../../services/authServices.js';
import User from '../../db/models/User.js';

describe('test api/auth/login', () => {
    let server = null;
    beforeAll(async () => {
        await db_connection();
        server = app.listen(3000, () => console.log('Server is running on port: 3000'));
    });

    afterAll(() => {
        sequelize.close();
        server.close();
    });

    afterEach(async () => {
        await User.destroy({ where: { email: 'example@example.com' } });
    });

    test('test login with correct credentials', async () => {
        const authData = {
            email: 'example@example.com',
            password: '12345678',
        };
        await registerUser(authData);

        const { status, body } = await request(app).post('/api/auth/login').send(authData);

        expect(status).toBe(200);
        expect(body.user.email).toBe(authData.email);
        expect(body.user.subscription).toBe('starter');
        expect(body).toHaveProperty('token');

        const userFromDB = await findUser({ email: authData.email });

        expect(userFromDB.email).toBe(body.user.email);
        expect(userFromDB.token).toBe(body.token);
        expect(userFromDB.subscription).toBe(body.user.subscription);
    });

    test('test login with wrong credentials', async () => {
        const authData = {
            email: 'example@example.com',
            password: '12345678',
        };
        await registerUser(authData);

        const authDataWithWrongEmail = {
            email: 'example1@example.com',
            password: '12345678',
        };

        const responseWrongEmail = await request(app).post('/api/auth/login').send(authDataWithWrongEmail);

        expect(responseWrongEmail.status).toBe(401);
        expect(responseWrongEmail.body).toHaveProperty('message');
        expect(responseWrongEmail.body.message).toBe('Email or password is wrong');

        const authDataWithWrongPassword = {
            email: 'example1@example.com',
            password: '12345678',
        };

        const responseWrongPass = await request(app).post('/api/auth/login').send(authDataWithWrongPassword);

        expect(responseWrongPass.status).toBe(401);
        expect(responseWrongPass.body).toHaveProperty('message');
        expect(responseWrongPass.body.message).toBe('Email or password is wrong');

        const authDataWithBadEmail = {
            email: 'example1_example.com',
            password: '12345678',
        };

        const responseBadEmail = await request(app).post('/api/auth/login').send(authDataWithBadEmail);

        expect(responseBadEmail.status).toBe(400);
        expect(responseBadEmail.body).toHaveProperty('message');
        expect(responseBadEmail.body.message).toBe('user email must contain "@"');
    });
});
