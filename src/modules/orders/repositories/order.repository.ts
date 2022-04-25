import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../entities/order.entity';
import { OrderRepositoryContracts } from './../contracts/order-repository.contracts';

export class OrderRepository
  extends Repository<Order>
  implements OrderRepositoryContracts
{
  registerOrder(order: CreateOrderDto): Promise<Order> {
    throw new Error('Method not implemented.');

    return Promise.resolve(new Order());
  }
  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
  findByCategory(categoryId: string): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
  findOrderById(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  findOrdersByIds(ids: string[]): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
