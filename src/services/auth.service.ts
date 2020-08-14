import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import BakerDocument from '@models/Baker';
import errorType from '@errors/index';

interface Obj {
  type: string;
  email: string;
  password: string;
}

export const authService = {
  baker: BakerDocument,
};

export async function authenticate(obj: Obj) {
  // @ts-ignore
  const dbBaker = await authService[obj.type]
    .findOne()
    .where('email', obj.email)
    .exec();

  if (!dbBaker) {
    return {
      status: 400,
      message: errorType.UserNotExists,
    };
  }

  const isCorrectPassword = bcrypt.compareSync(obj.password, dbBaker.password);

  if (!isCorrectPassword) {
    return {
      status: 400,
      message: errorType.InvalidAccess,
    };
  }

  // @ts-ignore
  const { id } = dbBaker;

  const token = jwt.sign(
    { id, email: obj.email, type: obj.type },
    process.env.SECRET || '',
    {
      expiresIn: 3000, // expires in 5min
    },
  );

  const {
    email, profileImageUrl, companyName, name,
  } = dbBaker;

  return {
    token,
    // eslint-disable-next-line no-underscore-dangle
    id,
    email,
    profileImageUrl,
    companyName,
    name,
  };
}
