import Controller from '@lib/controller';
import { validator } from '@utils/validator.util';
import { Action } from '@utils/handler.util';
import s3Validation from '@validators/s3.store.validator';
import S3Service from '@services/s3.service';

export class S3Controller extends Controller {
  store: Action = async (req, res) => {
    const validation = await validator(s3Validation, req.body);

    if (validation) {
      return res.status(400).json(validation);
    }

    const buffer = Buffer.from(req.body.file.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    req.body.buffer = buffer;

    const s3Upload = await S3Service.create(req);

    return res.status(200).json(s3Upload);
  }
}

export const s3 = new S3Controller();
