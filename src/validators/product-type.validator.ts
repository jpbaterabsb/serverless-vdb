import * as Yup from 'yup';

const productTypeValidator:
  Yup.ObjectSchema<Yup.Shape<null | undefined | object, object>> = Yup.object().shape({
    type: Yup.string().required(),
  });

export default productTypeValidator;
