import { CreateOrderDto } from '../../../orders/dtos/create-order.dto';
import { Order } from '../../../orders/entities/order.entity';

export interface OrderServiceContracts {
  registerOrder(data: CreateOrderDto): Promise<Order>;
}
