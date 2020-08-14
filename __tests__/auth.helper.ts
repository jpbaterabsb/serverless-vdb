import * as jwt from 'jsonwebtoken';

export default function authenticate() {
  process.env.SECRET = 'teste';
  return `Bearer ${jwt.sign(
    { id: '1', email: 'teste@gmail.com', type: 'baker' },
    process.env.SECRET || '',
    {
      expiresIn: 3000, // expires in 5min
    },
  )}`;
}
