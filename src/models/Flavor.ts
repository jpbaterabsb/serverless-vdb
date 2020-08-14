import { Schema, Document, model } from 'mongoose';
import configure from '@utils/schema.util';

export interface Flavor extends Document {
  flavor: string,
}

export const FlavorSchema = new Schema({
  flavor: { type: String, required: true },
}, { timestamps: true });

export default model<Flavor>('Flavor', configure(FlavorSchema), 'Flavor');
