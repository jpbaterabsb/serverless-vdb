/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { expressApp } from '../src/server';
import productCategory from './object/product-category.create.object';
import waitForConnection from '../src/utils/mongoose.util';
import authenticate from './auth.helper';

afterAll(async () => {
  await waitForConnection(mongoose);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('PATH - /product-categories', () => {
  const token = authenticate();
  test('Create Product Categories - POST /product-categories', async (done) => {
    request(expressApp)
      .post('/product-categories')
      .set('authorization', token)
      .send(productCategory)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length === 2).toBeTruthy();
        done();
      });
  });

  test('Create Product Categories - Expect Error Already Exists - POST /product-categories', async (done) => {
    request(expressApp)
      .post('/product-categories')
      .set('authorization', token)
      .send(productCategory)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length === 2).toBeTruthy();
        done();
      });
  });

  test('List Product Categories - GET /product-categories', async (done) => {
    request(expressApp)
      .get('/product-categories')
      .set('authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length === 2).toBeTruthy();
        done();
      });
  });
});
