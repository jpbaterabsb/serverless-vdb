import { Schema } from 'mongoose';
import PointSchema from './PointSchema';
const Address = new Schema({
    id: { type: String, required: true },
    name: { type: String },
    street: { type: String },
    streetNumber: { type: String },
    neighborhood: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipcode: { type: String },
    geopoint: [{ type: PointSchema, required: true }],
});
export default Address;
//# sourceMappingURL=Address.js.map