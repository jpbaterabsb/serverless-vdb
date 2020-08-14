import { Request, Response } from 'express';
import Controller from '@lib/controller';
import { Action } from '@utils/handler.util';
import { validator } from '@utils/validator.util';
import authValidator from '@validators/auth.validator';
import { authenticate } from '@services/auth.service';

export class AuthController extends Controller {
  store: Action = async (req: Request, res: Response) => {
    const error = await validator(authValidator, req.body);
    if (error) {
      return res.status(400).json(error);
    }
    const authResponse = await authenticate(req.body);
    return res.json(authResponse);
  }
}

export const auth = new AuthController();
