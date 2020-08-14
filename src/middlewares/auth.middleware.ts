import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import errorType from '@errors/index';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: errorType.TokenRequired });
  }

  try {
    // @ts-ignore
    const { id, email, type } = await promisify(jwt.verify)(
      authHeader.substring(7),
      // @ts-ignore
      process.env.SECRET,
    );
    req.user = { id, email, type };
    return next();
  } catch (error) {
    return res.status(401).json({ error: errorType.InvalidToken });
  }
};
