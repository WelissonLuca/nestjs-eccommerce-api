import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../entities/order.entity';

export interface OrderRepositoryContracts {
  registerOrder(order: CreateOrderDto): Promise<Order>;
  findAll(): Promise<Order[]>;
  findByCategory(categoryId: string): Promise<Order[]>;
  findOrderById(id: string): Promise<Order>;
  findOrdersByIds(ids: string[]): Promise<Order[]>;
}
