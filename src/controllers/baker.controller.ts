import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Controller from '@lib/controller';
import bakeStoreValidator from '@validators/baker.store.validator';
import { validator } from '@utils/validator.util';
import { Action } from '@utils/handler.util';
import deliveries from '@utils/delivery-type.utils';
import BakerDocument from '@models/Baker';
import { withTransaction } from '@utils/transaction.util';
import errorType from '@errors/index';

export class BakerController extends Controller {
  store: Action = async (req: Request, res: Response) => {
    const error = await validator(bakeStoreValidator, req.body);
    if (error) {
      return res.status(400).json(error);
    }

    const baker = req.body;

    if (!deliveries[baker.deliveryType]) {
      return res.status(400).json({
        message: errorType.NotExists('DeliveryType'),
      });
    }

    baker.deliveryType = deliveries[baker.deliveryType];
    baker.password = await bcrypt.hash(baker.password, 10);
    baker.address.geopoint.type = 'Point';
    baker.address.geopoint.coordinates = [
      baker.address.geopoint.longitude,
      baker.address.geopoint.latitude,
    ];

    // @ts-ignore
    let dbBaker;

    dbBaker = await BakerDocument.findOne()
      .or([{ email: baker.email }, { cnpj: baker.cnpj }])
      .exec();

    if (dbBaker) {
      return res.status(400).json({
        message: errorType.BakerAlreadyExistsWithThisEmailOrCnpj,
      });
    }

    await withTransaction(async () => {
      dbBaker = await BakerDocument.create(baker);
    });

    // @ts-ignore
    const {
      _id: id, email, profileImageUrl, companyName, name,
    } = dbBaker;

    const token = jwt.sign({ id, email }, process.env.SECRET || '', {
      expiresIn: 3000, // expires in 5min
    });

    return res.json({
      id, profileImageUrl, companyName, name, token, type: 'baker',
    });
  };

  index: Action = async (req: Request, res: Response) => {
    // @ts-ignore
    const { id } = req.user;
    const currentBaker = await BakerDocument.findById(id);
    return res.json(currentBaker);
  }

  update: Action = async (req: Request, res: Response) => {
    const baker = req.body;
    const { id } = req.params;

    baker.id = id;

    if (baker.deliveryType) {
      if (!deliveries[baker.deliveryType]) {
        return res.status(400).json({
          message: errorType.NotExists('DeliveryType'),
        });
      }
      baker.deliveryType = deliveries[baker.deliveryType];
    }

    if (baker.password) {
      baker.password = await bcrypt.hash(baker.password, 10);
    }

    if (baker.address) {
      baker.address.geopoint.type = 'Point';
      baker.address.geopoint.coordinates = [
        baker.address.geopoint.longitude,
        baker.address.geopoint.latitude,
      ];
    }

    const dbBaker = await BakerDocument.findOne()
      .where('_id').ne(id)
      .or([{ email: baker.email }, { cnpj: baker.cnpj }])
      .exec();

    if (dbBaker) {
      return res.status(400).json({
        message: errorType.BakerAlreadyExistsWithThisEmailOrCnpj,
      });
    }

    await withTransaction(async () => {
      await BakerDocument.findByIdAndUpdate(baker.id, baker);
    });

    return res.status(204).send();
  }

  // index: Action = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   return res.status(200).json(await BakerDocument.findOne({ _id: id }));
  // };
}

export const baker = new BakerController();
