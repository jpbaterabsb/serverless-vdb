import { Schema, Document, model } from 'mongoose';
import configure from '@utils/schema.util';

export interface HealthAndWelfare extends Document {
  text: string;
}

export const HealthAndWelfareSchema = new Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true, collection: 'HealthAndWelfare' },
);

export default model<HealthAndWelfare>(
  'HealthAndWelfare',
  configure(HealthAndWelfareSchema),
);
