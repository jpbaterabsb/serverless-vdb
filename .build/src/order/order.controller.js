import { Controller } from "../lib/controller";
import { OrderService } from "./order.service";
class OrderController extends Controller {
    constructor() {
        super(...arguments);
        this.index = (_req, res) => {
            const orderService = OrderService.init();
            return res.json(orderService.listOrders());
        };
    }
}
export default new OrderController().routes();
//# sourceMappingURL=order.controller.js.map