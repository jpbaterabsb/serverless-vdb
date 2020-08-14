import * as Yup from 'yup';
import ptBr from '@translations/pt_BR';
import errorType from '@errors/index';

Yup.setLocale(ptBr);

export type Validator =
(validationSchema: Yup.ObjectSchema<Yup.Shape<null | undefined | object, any>>, params: any) => any;

export const validator: Validator = async (validationSchema, params) => validationSchema
  .validate(params)
  .then(() => undefined)
  .catch((err) => ({ error: err.name, message: err.errors }));

export interface Error {
  error: String,
  errors: object | null | undefined
}

export async function validArrayId(arrayToSearch, model, name) {
  const dbArray = await model.find({ _id: { $in: arrayToSearch } });

  const notPersistFlavors = await arrayToSearch
    .find((f) => !dbArray.some((f2) => f2.id === f));

  if (notPersistFlavors && notPersistFlavors.length > 0) {
    return {
      error: errorType.NotExists(name),
      id: notPersistFlavors,
    };
  }
  return undefined;
}
