/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { expressApp } from '../src/server';
import flavors from './object/flavors.crate.object';
import waitForConnection from '../src/utils/mongoose.util';
import authenticate from './auth.helper';

afterAll(async () => {
  await waitForConnection(mongoose);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('PATH - /flavors', () => {
  const token = authenticate();
  test('Create Flavors - POST /flavors', async (done) => {
    request(expressApp)
      .post('/flavors')
      .set('authorization', token)
      .send(flavors)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length === 2).toBeTruthy();
        done();
      });
  });

  test('Create Flavors - Expect Error Already Exists - POST /flavors', async (done) => {
    request(expressApp)
      .post('/flavors')
      .set('authorization', token)
      .send(flavors)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length === 2).toBeTruthy();
        done();
      });
  });

  test('List Flavors - GET /flavors', async (done) => {
    request(expressApp)
      .get('/flavors')
      .set('authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length === 2).toBeTruthy();
        done();
      });
  });
});
