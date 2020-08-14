import { Schema } from 'mongoose';
const OrderProduct = new Schema({
    id: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    groups: [{ type: String }],
    flavours: [{ type: String }],
    imageUrls: [{ type: String }],
    variation: [{ type: String, required: true }],
    additionalOptions: { type: String, required: true },
    price: { type: Number, required: true },
    productNote: { type: String },
    rewiew: { type: String, required: true },
});
export default OrderProduct;
//# sourceMappingURL=OrderProduct.js.map