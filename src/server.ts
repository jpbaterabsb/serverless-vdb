// Imports
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { orders } from '@controllers/order.controller';
import { flavor } from '@controllers/flavor.controller';
import { baker } from '@controllers/baker.controller';
import { s3 } from '@controllers/s3.controller';
import { auth } from '@controllers/auth.controller';
import { productTypes } from '@controllers/products-type.controller';
import { productCategory } from '@controllers/product-category.controller';
import { healthAndWelfare } from '@controllers/product-healthAndWelfare.controller';
import { product } from '@controllers/product.controller';
import authentication from '@middlewares/auth.middleware';
import { handler } from '@utils/handler.util';
import sls = require('serverless-http');
import express = require('express');
import createError = require('http-errors');
import timeout = require('connect-timeout');

const app = express();

// Middleware
app.use(timeout('100s'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect
const url = process.env.IS_OFFLINE || process.env.NODE_ENV === 'test'
  ? 'mongodb://localhost:27017/vem-de-bolo-test'
  : process.env.MONGO_URL;

// @ts-ignore
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// eslint-disable-next-line no-console
mongoose.connection.on('error', (e) => console.log(e));

// Routes
app.get('/up', (_req, res) => res.json({
  status: 'up',
  env: process.env.NODE_ENV,
  bucket: process.env.BUCKET,
  mongo: process.env.MONGO_URL !== undefined,
}));

app.post('/signup-baker', handler(baker.store));
app.use('/auth', auth.routes());
app.use(authentication);
app.use('/bakers', baker.routes());
app.use('/products', product.routes());
app.use('/product-categories', productCategory.routes());
app.use('/product-healthAndWelfare', healthAndWelfare.routes());
app.use('/flavors', flavor.routes());
app.use('/product-types', productTypes.routes());
app.use('/s3', s3.routes());
app.use('/orders', orders.routes());

// Errors
app.use((_req, _res, next) => {
  next(createError(404));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _: any) => {
  res.status(err.status || 500);

  res.json(err);
});

export const expressApp = app;

// Export app
export const run = sls(app);
