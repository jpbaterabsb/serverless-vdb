import { Request, Response } from 'express';
import Controller from '@lib/controller';
import ProductCategory from '@models/ProductCategory';
import { Action } from '@utils/handler.util';
import { validator } from '@utils/validator.util';
import { withTransaction } from '@utils/transaction.util';
import validationStore from '@validators/category.validator';
import errorType from '@errors/index';

export class ProductCategoryController extends Controller {
  index: Action = async (req: Request, res: Response) => {
    const { limit = 10, offset = 0 } = req.query;

    // @ts-ignore
    return res.json(await ProductCategory.find().limit(limit).skip(offset * limit));
  }

  store: Action = async (req: Request, res: Response) => {
    const arrayProductCategory = req.body;
    const errorArray = [];
    const alreadyExists = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, category] of arrayProductCategory.entries()) {
      // eslint-disable-next-line no-await-in-loop
      const error = await validator(validationStore, category);
      if (error) {
        errorArray.push({ ...error, index });
      }
    }

    if (errorArray.length > 0) {
      return res.status(400).json(errorArray);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, category] of arrayProductCategory.entries()) {
      // eslint-disable-next-line no-await-in-loop
      const categoryFindOne = await ProductCategory.findOne(category);
      if (categoryFindOne) {
        alreadyExists.push({ error: errorType.AlreadyExists('ProductCategory'), category: category.category, index });
      }
    }

    if (alreadyExists.length > 0) {
      return res.status(400).json(alreadyExists);
    }

    let dbcategoryArray;

    await withTransaction(async () => {
      dbcategoryArray = await ProductCategory.create(arrayProductCategory);
    });

    return res.status(201).json(dbcategoryArray);
  }
}

export const productCategory = new ProductCategoryController();
