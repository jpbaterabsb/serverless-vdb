import { Service } from '../lib/service';
import { Order } from '../models';
export class OrderService extends Service {
    listOrders() {
        return Order.find();
    }
    static init() {
        return new OrderService();
    }
}
//# sourceMappingURL=order.service.js.map