import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../entities/order.entity';

export interface OrderRepositoryContracts {
  registerOrder(order: CreateOrderDto): Promise<Order>;
  findAllByConsumerId(consumerId: string): Promise<Order[]>;
  findOrderById(id: string): Promise<Order>;
}
