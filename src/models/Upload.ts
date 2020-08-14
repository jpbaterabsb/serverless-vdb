import { Document, Schema, model } from 'mongoose';
import configure from '@utils/schema.util';

export interface Upload extends Document{
  uploadTypeName: string,
  fileTypeName: string,
  dataSizeBytes: number,
  mimeType: string,
  url?: string,
}

export const UploadSchema = new Schema({
  uploadTypeName: { type: String, required: true },
  fileTypeName: { type: String, required: true },
  mimeType: { type: String, required: true },
  dataSizeBytes: { type: Number, required: true },
  url: { type: String },
}, { timestamps: true, collection: 'UploadSchema' });

export default model<Upload>('Upload', configure(UploadSchema));
