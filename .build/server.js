import * as sls from 'serverless-http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as createError from 'http-errors';
import OrderController from './src/order/order.controller';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const url = process.env.MONGO_URL;
mongoose.connect(url ? url : 'mongodb://localhost:27017/vem-de-bolo');
app.use('/orders', OrderController);
app.get('/up', (_req, res) => res.json({ status: 'up' }));
app.use((_req, _res, next) => {
    next(createError(404));
});
app.use((error, _req, res, _next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message,
        status: error.status,
    });
});
export const run = sls(app);
//# sourceMappingURL=server.js.map