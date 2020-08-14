import s3 from '@utils/s3.util';
import { fileType } from '@utils/file.utils';
import UploadDocument from '@models/Upload';
import { withTransaction } from '@utils/transaction.util';

class S3Service {
  create = async (req: any) => {
    const { s3Client } = s3;
    const params = s3.uploadParams;
    const { uploadTypeName, mimeType, buffer } = req.body;

    const { path: fileTypeName } = fileType[uploadTypeName];
    // @ts-ignore
    let upload;

    await withTransaction(async () => {
      upload = await UploadDocument.create({
        uploadTypeName,
        dataSizeBytes: buffer.length,
        mimeType,
        fileTypeName,
      });

      params.Key = `upload/${fileTypeName}/${upload.id}`;
      params.Body = buffer;
      params.ContentType = mimeType;

      const uploadedFile = await s3Client.upload(params).promise();

      upload.url = uploadedFile.Location;

      upload.save();
    });

    return {
      // @ts-ignore
      uploadId: upload.id,
      // @ts-ignore
      URL: upload.url,
    };
  }
}

export default new S3Service();
