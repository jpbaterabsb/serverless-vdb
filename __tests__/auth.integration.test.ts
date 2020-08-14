/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { expressApp } from '../src/server';
import baker from './object/baker.create.object';
import waitForConnection from '../src/utils/mongoose.util';

afterAll(async () => {
  await waitForConnection(mongoose);
  mongoose.connection.db.dropDatabase();
  mongoose.disconnect();
});

describe('PATH - /auth', () => {
  process.env.SECRET = 'teste';
  test('Create Baker - POST /bakers', async (done) => {
    request(expressApp)
      .post('/signup-baker')
      .send(baker)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.token).not.toBeUndefined();
        expect(res.body.id).not.toBeUndefined();
        done();
      });
  });

  test('Login Auth - POST /auth', async (done) => {
    request(expressApp)
      .post('/auth')
      .send({
        email: baker.email,
        password: baker.password,
        type: 'baker',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.token).not.toBeUndefined();
        expect(res.body.id).not.toBeUndefined();
        done();
      });
  });
});
