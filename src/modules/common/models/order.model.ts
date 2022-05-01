import { Order } from './../../orders/entities/order.entity';
export class OrderModel extends Order {
  constructor(data: Order) {
    super();
    Object.assign(this, data);
  }
}
