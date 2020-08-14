import * as Yup from 'yup';

const flavorValidation:
  Yup.ObjectSchema<Yup.Shape<null | undefined | object, object>> = Yup.object().shape({
    flavor: Yup.string().required(),
  });

export default flavorValidation;
