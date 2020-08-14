import { Schema, Document, model } from 'mongoose';
import configure from '@utils/schema.util';
import { Address, AddressSchema } from './Address';

export interface Baker extends Document {
  name: string,
  email: string,
  cnpj: string,
  phoneNumber: string,
  password: string,
  companyName: string,
  address: Address,
  deliveryType: string,
  range: number,
  openingHours: {
    start: number,
    end: number,
  },
  profileImageUrl: string,
}

export const OpeningHoursSchema = new Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
});

export const BakerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cnpj: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  companyName: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  deliveryType: { type: String, required: true },
  range: { type: Number, required: true },
  openingHours: { type: OpeningHoursSchema, required: true },
  profileImageUrl: { type: String },
  password: { type: String, required: true },
}, { timestamps: true, collection: 'Baker' });

export default model<Baker>('Baker', configure(BakerSchema));
