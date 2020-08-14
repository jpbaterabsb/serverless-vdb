import * as Yup from 'yup';

const bakerStoreValidator:
Yup.ObjectSchema<Yup.Shape<null | undefined | object, object>> = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  cnpj: Yup.number().required(),
  phoneNumber: Yup.string().required(),
  companyName: Yup.string().required(),
  address: Yup.object().shape({
    streetName: Yup.string(),
    number: Yup.string(),
    state: Yup.string().required(),
    complement: Yup.string().required(),
    zipcode: Yup.string(),
    city: Yup.string().required(),
    geopoint: Yup.object().shape({
      longitude: Yup.number().required(),
      latitude: Yup.number().required(),
    }).required(),
  }).required(),
  deliveryType: Yup.string().required(),
  range: Yup.number().required(),
  openingHours: Yup.object().shape({
    start: Yup.string().required(),
    end: Yup.string().required(),
  }).required(),
  profileImageUrl: Yup.string().notRequired(),
});

export default bakerStoreValidator;
