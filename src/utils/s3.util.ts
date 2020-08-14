import * as AWS from 'aws-sdk';

const s3Client = new AWS.S3();

type S3Util = {
  s3Client: AWS.S3,
  uploadParams: {
    Key: string,
    Bucket: string,
    ACL: string,
    Body: any | undefined,
    ContentType?: string,
  }
};

const uploadParams = {
  ACL: 'public-read',
  Bucket: process.env.BUCKET,
  Key: '', // pass key
  Body: null, // pass file body
};

const s3: S3Util = {
  // @ts-ignore
  uploadParams,
  s3Client,
};

export default s3;
