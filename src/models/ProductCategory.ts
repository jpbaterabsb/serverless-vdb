import { Schema, Document, model } from 'mongoose';
import configure from '@utils/schema.util';

export interface ProductCategory extends Document {
  category: string,
}

export const ProductCategorySchema = new Schema({
  category: { type: String, required: true },
}, { timestamps: true, collection: 'ProductCategory' });

export default model<ProductCategory>('ProductCategory', configure(ProductCategorySchema));
