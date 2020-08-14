import * as Yup from 'yup';

const healthAndWelfareValidation: Yup.ObjectSchema<Yup.Shape<
  null | undefined | object,
  object
>> = Yup.object().shape({
  text: Yup.string().required(),
});

export default healthAndWelfareValidation;
