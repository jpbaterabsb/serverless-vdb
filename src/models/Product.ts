import { Schema, Document, model } from 'mongoose';
import configure from '@utils/schema.util';

export interface Product extends Document {
  name: string;
  bakerId: string;
  description: string;
  ingredients: string;
  type: string;
  flavors: string[];
  categories: string[];
  healthAndWelfare: string[];
  photos: string[];
  timeToDeliver: number;
  optionToChoose: OptionToChoose;
  optionAditional: OptionAditional;
}

export interface OptionAditional extends Document {
  name: string;
  additionalPrice: number;
  flavors: string[];
}

export const OptionAditionalSchema = new Schema({
  name: { type: String, required: true },
  additionalPrice: { type: Number, required: true },
  flavors: { type: [String], required: true },
});

export interface OptionToChoose extends Document {
  byWeigth: number;
  price: number;
  wayToSell: string;
  byUnit: number;
  numberOfPeopleServed: number;
}

export const OptionToChooseSchema = new Schema({
  byWeigth: { type: Number, required: true },
  price: { type: Number, required: true },
  wayToSell: { type: String, required: true },
  byUnit: { type: Number, required: true },
  numberOfPeopleServed: { type: Number, required: true },
});

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    photos: { type: [String] },
    bakerId: { type: String },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    type: { type: String, required: true },
    flavors: { type: [String], required: true },
    categories: { type: [String], required: true },
    healthAndWelfare: { type: [String], required: true },
    timeToDeliver: { type: Number, required: true },
    optionToChoose: { type: [OptionToChooseSchema] },
    optionAditional: { type: [OptionAditionalSchema] },
  },
  { timestamps: true, collection: 'Product' },
);

export default model<Product>('Product', configure(ProductSchema));
