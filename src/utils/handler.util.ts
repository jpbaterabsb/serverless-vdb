import { Request, Response, NextFunction } from 'express';
import { Youch } from '../utils/Youch';

export type Action = (req: Request, res: Response, next: NextFunction) => any;

// export const handler = (fn:any) => async (req: Request, res: Response, next: NextFunction) => {
//   return new Promise(await fn(req, res, next)).catch(e => {
//     new Youch(e, req).toJSON().then(y => next(y));
//   });
// }

export const handler = (fn:any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    next(await new Youch(e, req).toJSON());
  }
};
