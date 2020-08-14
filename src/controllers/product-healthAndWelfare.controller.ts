import { Request, Response } from 'express';
import Controller from '@lib/controller';
import HealthAndWelfare from '@models/HealthAndWelfare';
import { Action } from '@utils/handler.util';
import { validator } from '@utils/validator.util';
import validationStore from '@validators/product-healthAndWelfare.validator';
import errorType from '@errors/index';

export class HealthAndWelfareController extends Controller {
  index: Action = async (req: Request, res: Response) => {
    const { limit = 10, offset = 0 } = req.query;

    // @ts-ignore
    return res.json(
      await HealthAndWelfare.find()
        .limit(limit as number)
        .skip((offset as number) * (limit as number)),
    );
  };

  store: Action = async (req: Request, res: Response) => {
    const arrayHealthAndWelfare = req.body;
    const errorArray = [];
    const alreadyExists = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, healthAndWelfare] of arrayHealthAndWelfare.entries()) {
      // eslint-disable-next-line no-await-in-loop
      const error = await validator(validationStore, healthAndWelfare);
      if (error) {
        errorArray.push({ ...error, index });
      }
    }

    if (errorArray.length > 0) {
      return res.status(400).json(errorArray);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, healthAndWelfare] of arrayHealthAndWelfare.entries()) {
      // eslint-disable-next-line no-await-in-loop
      const questionFindOne = await HealthAndWelfare.findOne(healthAndWelfare);
      if (questionFindOne) {
        alreadyExists.push({
          error: errorType.AlreadyExists('HealthAndWelfare'),
          healthAndWelfare: healthAndWelfare.text,
          index,
        });
      }
    }

    if (alreadyExists.length > 0) {
      return res.status(400).json(alreadyExists);
    }

    const dbQuestionArray = await HealthAndWelfare.create(
      arrayHealthAndWelfare,
    );

    return res.status(201).json(dbQuestionArray);
  };
}

export const healthAndWelfare = new HealthAndWelfareController();
