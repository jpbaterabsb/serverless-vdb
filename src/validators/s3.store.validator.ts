import * as Yup from 'yup';

const s3Validator = Yup.object().shape({
  file: Yup.string().required(),
  mimeType: Yup.string().required(),
  uploadTypeName: Yup.string().required(),
});

export default s3Validator;
