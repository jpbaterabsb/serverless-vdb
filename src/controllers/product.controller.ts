import { Request, Response } from 'express';
import Controller from '@lib/controller';
import Product from '@models/Product';
import ProductTypes from '@models/ProductTypes';
import Flavor from '@models/Flavor';
import HealthAndWelfare from '@models/HealthAndWelfare';
import ProductCategory from '@models/ProductCategory';
import { Action } from '@utils/handler.util';
import { validator, validArrayId } from '@utils/validator.util';
import { withTransaction } from '@utils/transaction.util';
import validationStore from '@validators/product.validator';
import errorType from '@errors/index';

export class ProductController extends Controller {
  index: Action = async (req: Request, res: Response) => {
    // @ts-ignore
    const { id } = req.user;
    const { limit = 10, offset = 0 } = req.query;

    // @ts-ignore
    return res.json(
      await Product.find({ deleted: false, bakerId: id })
        .limit(limit as number)
        .skip((offset as number) * (limit as number)),
    );
  };

  show: Action = async (req: Request, res: Response) => {
    const { id } = req.params;

    // @ts-ignore
    return res.json(await Product.findOne({ _id: id }));
  };

  store: Action = async (req: Request, res: Response) => {
    let productCreated;
    // @ts-ignore
    const productRequestBody = { ...req.body, bakerId: req.user.id };

    await this.validation(req, res);

    if (res.statusCode === 400) {
      return res;
    }

    await withTransaction(async () => {
      productCreated = await Product.create(productRequestBody);
    });

    return res.status(201).json(productCreated);
  };

  update: Action = async (req: Request, res: Response) => {
    const { id } = req.params;
    const productRequestBody = req.body;

    await this.validation(req, res);

    if (res.statusCode === 400) {
      return res;
    }

    return withTransaction(async () => {
      const response = await Product.findOneAndUpdate(
        { _id: id },
        productRequestBody,
      );

      if (!response) {
        return res.status(400).json({
          error: errorType.NotExists('Product'),
        });
      }

      return res.status(204).send();
    });
  };

  delete: Action = async (req: Request, res: Response) => {
    const { id } = req.params;

    return withTransaction(async () => {
      const response = await Product.findOneAndUpdate(
        { _id: id },
        { deleted: true },
      );

      if (!response) {
        return res.status(400).json({
          error: errorType.NotExists('Product'),
        });
      }

      return res.status(204).send();
    });
  };

  validation = async (req, res) => {
    const error = await validator(validationStore, req.body);

    if (error) {
      return res.status(400).json(error);
    }

    const productRequestBody = req.body;

    const dbType = await ProductTypes.findOne({ _id: productRequestBody.type });

    if (!dbType) {
      return res.status(400).json({
        error: errorType.NotExists('Type'),
      });
    }

    const errorsFlavor = await validArrayId(
      productRequestBody.flavors,
      Flavor,
      'Flavor',
    );

    if (errorsFlavor) {
      return res.status(400).json(errorsFlavor);
    }

    const errorsHealthAndWelfare = await validArrayId(
      productRequestBody.healthAndWelfare,
      HealthAndWelfare,
      'HealthAndWelfare',
    );

    if (errorsHealthAndWelfare) {
      return res.status(400).json(errorsHealthAndWelfare);
    }

    const errorsCategories = await validArrayId(
      productRequestBody.categories,
      ProductCategory,
      'ProductCategory',
    );

    if (errorsCategories) {
      return res.status(400).json(errorsCategories);
    }
    return undefined;
  };
}

export const product = new ProductController();
