import { Schema, Document, model } from 'mongoose';
import configure from '@utils/schema.util';

export interface ProductsType extends Document {
  type: string,
}

export const ProductsTypeSchema = new Schema({
  type: { type: String, required: true },
}, { timestamps: true, collection: 'ProductsType' });

export default model<ProductsType>('ProductsType', configure(ProductsTypeSchema));
