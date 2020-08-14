import { Schema } from 'mongoose';
import mongooseDelete = require('mongoose-delete');

export default function configure(schema: Schema) {
  schema.plugin(mongooseDelete);

  return schema;
}
