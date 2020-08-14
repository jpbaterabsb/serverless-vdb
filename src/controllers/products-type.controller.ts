/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { Request, Response } from 'express';
import Controller from '@lib/controller';
import ProductTypes from '@models/ProductTypes';
import { Action } from '@utils/handler.util';
import { validator } from '@utils/validator.util';
import { withTransaction } from '@utils/transaction.util';
import validationStore from '@validators/product-type.validator';
import errorType from '@errors/index';

export class ProductTypeController extends Controller {
  index: Action = async (req: Request, res: Response) => {
    const { limit = 10, offset = 0 } = req.query;

    // @ts-ignore
    return res.json(await ProductTypes.find().limit(limit).skip(offset * limit));
  }

  store: Action = async (req: Request, res: Response) => {
    const arrayProductTypes = req.body;
    const errorArray = [];
    const alreadyExists = [];

    for (const [index, productType] of arrayProductTypes.entries()) {
      const error = await validator(validationStore, productType);
      if (error) {
        errorArray.push({ ...error, index });
      }
    }

    if (errorArray.length > 0) {
      return res.status(400).json(errorArray);
    }

    for (const [index, productType] of arrayProductTypes.entries()) {
      const productFindOne = await ProductTypes.findOne(productType);
      if (productFindOne) {
        alreadyExists.push({ error: errorType.AlreadyExists('ProductTypes'), type: productType.type, index });
      }
    }

    if (alreadyExists.length > 0) {
      return res.status(400).json(alreadyExists);
    }

    let dbProductTypeArray;

    await withTransaction(async () => {
      dbProductTypeArray = await ProductTypes.create(arrayProductTypes);
    });

    return res.status(201).json(dbProductTypeArray);
  }
}

export const productTypes = new ProductTypeController();
