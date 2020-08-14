import { Schema, Document, model } from 'mongoose';
import configure from '@utils/schema.util';
import { Point, PointSchema } from './Point';

export interface Address extends Document {
  streetName: string,
  state: string,
  number: string,
  complement: string,
  zipcode: string,
  city: string,
  geopoint: Point
}

export const AddressSchema = new Schema({
  streetName: { type: String },
  number: { type: String },
  complement: { type: String },
  zipcode: { type: String },
  city: { type: String },
  state: { type: String },
  geopoint: { type: PointSchema, required: true },
}, {
  timestamps: true,
  collection: 'Address',
});

export default model<Address>('Address', configure(AddressSchema));
