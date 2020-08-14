/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { expressApp } from '../src/server';
import productType from './object/products-type.create.object';
import waitForConnection from '../src/utils/mongoose.util';
import authenticate from './auth.helper';

afterAll(async () => {
  await waitForConnection(mongoose);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('PATH - /product-types', () => {
  const token = authenticate();
  test('Create Product Types - POST /product-types', async (done) => {
    request(expressApp)
      .post('/product-types')
      .set('authorization', token)
      .send(productType)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length === 2).toBeTruthy();
        done();
      });
  });

  test('Create Product Types - Expect Error Already Exists - POST /product-types', async (done) => {
    request(expressApp)
      .post('/product-types')
      .set('authorization', token)
      .send(productType)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length === 2).toBeTruthy();
        done();
      });
  });

  test('List Product Types - GET /product-types', async (done) => {
    request(expressApp)
      .get('/product-types')
      .set('authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length === 2).toBeTruthy();
        done();
      });
  });
});
