import { Schema, Document, model } from 'mongoose';
import configure from '@utils/schema.util';
import { Product, ProductSchema } from '@models/Product';

export interface OrderProduct extends Document {
  id: string,
  product: Product[],
  name: string,
  description: string,
  category: string,
  groups: string,
  flavours: string,
  imageUrls: string,
  variation: string, // TODO: ProductVariation
  additionalOptions: string, // TODO: AdditionalOptions
  price: number,
  productNote: string,
  rewiew: string // TODO: Review
}

export const OrderProductSchema = new Schema({
  id: { type: String, required: true },
  product: { type: [ProductSchema], required: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  groups: [{ type: String }],
  flavours: [{ type: String }],
  imageUrls: [{ type: String }],
  variation: [{ type: String, required: true }], // TODO: ProductVariation
  additionalOptions: { type: String, required: true }, // TODO: AdditionalOptions
  price: { type: Number, required: true },
  productNote: { type: String },
  rewiew: { type: String, required: true }, // TODO: Review
}, { timestamps: true });

export default model<OrderProduct>('OrderProduct', configure(OrderProductSchema));
