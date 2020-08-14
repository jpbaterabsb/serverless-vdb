import * as Yup from 'yup';

const categoryValidation:
  Yup.ObjectSchema<Yup.Shape<null | undefined | object, object>> = Yup.object().shape({
    category: Yup.string().required(),
  });

export default categoryValidation;
