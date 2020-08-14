import { Request, Response } from 'express';
import Controller from '@lib/controller';
import OrderDocument from '@models/Order';
import OrderStatus from '@models/OrderStatus';
import { Action, handler } from '@utils/handler.util';
import errorType from '@errors/index';

export class OrderController extends Controller {
  index: Action = async (req: Request, res: Response) => {
    const query: any = {};
    const { status, limit = 10, offset = 0 } = req.query;

    if (status) {
      query.status = status;
    }

    const order = await OrderDocument.find(query).limit(limit as number)
      .skip((offset as number) * (limit as number));

    res.json(order);
  }

  store: Action = async (req: Request, res: Response) => {
    const order = req.body;

    const dbOrder = await OrderDocument.create(order);

    return res.status(200).json(dbOrder);
  }

  show: Action = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dbOrder = await OrderDocument.findById(id);

    if (!dbOrder) {
      return res.status(400).json({ error: errorType.NotExists('Order') });
    }

    return res.status(200).json(dbOrder);
  }

  updateStatus: Action = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !OrderStatus[status]) {
      return res.status(400).json({ error: errorType.NotExists('Status') });
    }

    const dbOrder = await OrderDocument.findById(id);

    if (!dbOrder) {
      return res.status(400).json({ error: errorType.NotExists('Order') });
    }

    dbOrder.status = status;
    await dbOrder.save();

    return res.status(204).send();
  }

  routes() {
    const router = super.routes();
    router.put('/status/:id', handler(this.updateStatus));
    return router;
  }
}

export const orders = new OrderController();
