import { Request, Response } from 'express';
import Controller from '@lib/controller';
import Flavor from '@models/Flavor';
import { Action } from '@utils/handler.util';
import { validator } from '@utils/validator.util';
import { withTransaction } from '@utils/transaction.util';
import validationStore from '@validators/flavor.validator';
import errorType from '@errors/index';

export class FlavorController extends Controller {
  index: Action = async (req: Request, res: Response) => {
    const { limit = 10, offset = 0 } = req.query;

    // @ts-ignore
    return res.json(await Flavor.find().limit(limit).skip(offset * limit));
  }

  store: Action = async (req: Request, res: Response) => {
    const arrayFlavor = req.body;

    await this.validate(arrayFlavor, res);

    if (res.statusCode === 400) {
      return res;
    }

    const alreadyExists = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, flavor] of arrayFlavor.entries()) {
      // eslint-disable-next-line no-await-in-loop
      const flavorFindOne = await Flavor.findOne(flavor);
      if (flavorFindOne) {
        alreadyExists.push({ error: errorType.AlreadyExists('Flavor'), flavor: flavor.flavor, index });
      }
    }

    if (alreadyExists.length > 0) {
      return res.status(400).json(alreadyExists);
    }

    let dbflavorArray;

    await withTransaction(async () => {
      dbflavorArray = await Flavor.create(arrayFlavor);
    });

    return res.status(201).json(dbflavorArray);
  }

  update: Action = async (req: Request, res: Response) => {
    const flavor = req.body;
    const { id } = req.params;

    const error = await validator(validationStore, flavor);

    if (error) {
      return res.status(400).json(error);
    }

    return withTransaction(async () => {
      const flavorfound = await Flavor.findOne({ _id: id });

      if (!flavorfound) {
        return res.status(400).json({ error: errorType.NotExists('Flavor') });
      }

      const flavorInvalid = await Flavor.findOne({ _id: { $ne: id }, flavor: flavor.flavor });

      if (flavorInvalid) {
        return res.status(400).json({ error: errorType.AlreadyExists('FlavorName') });
      }

      flavorfound.flavor = flavor.flavor;

      return flavorfound.save().then(() => res.status(204).send());
    });
  }

  validate = async (arrayFlavor, res) => {
    const errorArray = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, flavor] of arrayFlavor.entries()) {
      // eslint-disable-next-line no-await-in-loop
      const error = await validator(validationStore, flavor);
      if (error) {
        errorArray.push({ ...error, index });
      }
    }

    if (errorArray.length > 0) {
      return res.status(400).json(errorArray);
    }

    return res;
  }
}

export const flavor = new FlavorController();
