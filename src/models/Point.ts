import * as mongoose from 'mongoose';

export interface Point extends mongoose.Document {
  type: 'Point',
  longitude?: number,
  latitude?: number,
  coordinates: [number|undefined, number|undefined],
}

export const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export default mongoose.model<Point>('Points', PointSchema);
