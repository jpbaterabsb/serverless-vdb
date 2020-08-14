import * as mongoose from 'mongoose';
import configure from '@utils/schema.util';
import { AddressSchema, Address } from './Address';
import { OrderProduct, OrderProductSchema } from './OrderProduct';
import OrderStatus from './OrderStatus';

export interface Order extends mongoose.Document {
  ordernumber: string,
  customerId: string,
  vendorId: string,
  status: OrderStatus,
  customerNote: string,
  deliveryAdress: Address,
  items: OrderProduct[],
  deliveryDate: Date,
  deliveryPeriod: number,
  discountCodes: string[],
  totalDiscount: number,
  totalPrice: number,
  totalAmountToPay: number,
  paymentId: string,
  deliveryCost: number
}

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  customerId: { type: String, required: true },
  vendorId: { type: String, required: true },
  status: {
    type: String,
    enum:
      ['CONFIRMED',
        'PRODUCING',
        'COMPLETED',
        'CANCELLED'],
    required: true,
  },
  customerNote: { type: String },
  deliveryAdress: { type: AddressSchema, required: true },
  items: [{ type: OrderProductSchema, required: true }],
  deliveryDate: { type: Date, required: true },
  deliveryPeriod: { type: Number, required: true },
  discountCodes: [{ type: String, required: true }],
  totalDiscount: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  totalAmountToPay: { type: Number, required: true },
  paymentId: { type: String, required: true },
  deliveryCost: { type: Number, required: true },
}, { timestamps: true, collection: 'Order' });

export default mongoose.model<Order>('Order', configure(OrderSchema));
