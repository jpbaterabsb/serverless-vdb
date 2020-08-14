import { Schema } from 'mongoose';
import Address from './Address';
import OrderProduct from './OrderProduct';
export const OrderSchema = new Schema({
    id: { type: String, required: true },
    orderNumber: { type: String, required: true },
    customerId: { type: String, required: true },
    vendorId: { type: String, required: true },
    status: { type: String, required: true },
    customerNote: { type: String },
    deliveryAdress: { type: Address, required: true },
    items: [{ type: OrderProduct, required: true }],
    deliveryDate: { type: Date, required: true },
    deliveryPeriod: { type: Number, required: true },
    discountCodes: [{ type: String, required: true }],
    totalDiscount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    totalAmountToPay: { type: Number, required: true },
    paymentId: { type: String, required: true },
    deliveryCost: { type: Number, required: true },
});
//# sourceMappingURL=Order.js.map