import * as Yup from 'yup';

const optionToChooseValidator: Yup.ObjectSchema<Yup.Shape<
  null | undefined | object,
  object
>> = Yup.object().shape({
  byWeigth: Yup.number().required(),
  price: Yup.number().required(),
  wayToSell: Yup.string().required(),
  byUnit: Yup.number().required(),
  numberOfPeopleServed: Yup.number().required(),
});

const optionAditionalValidator: Yup.ObjectSchema<Yup.Shape<
  null | undefined | object,
  object
>> = Yup.object().shape({
  name: Yup.string().required(),
  additionalPrice: Yup.number().required(),
  flavors: Yup.array(Yup.string().required()).required(),
});

const productValidator: Yup.ObjectSchema<Yup.Shape<
  null | undefined | object,
  object
>> = Yup.object().shape({
  photos: Yup.string(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  ingredients: Yup.string().required(),
  type: Yup.string().required(),
  flavors: Yup.array(Yup.string().required()).required(),
  categories: Yup.array(Yup.string().required()).required(),
  healthAndWelfare: Yup.array(Yup.string()),
  timeToDeliver: Yup.number().required(),
  optionToChoose: Yup.array(optionToChooseValidator),
  optionAditional: Yup.array(optionAditionalValidator),
});

export default productValidator;
