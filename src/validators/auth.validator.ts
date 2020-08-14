import * as Yup from 'yup';

const authValidator:
Yup.ObjectSchema<Yup.Shape<null | undefined | object, object>> = Yup.object().shape({
  type: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
});

export default authValidator;
