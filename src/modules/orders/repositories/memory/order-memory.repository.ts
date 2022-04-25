import { setBaseEntityValues } from '../../../../utils/set-base-entity-values';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { Order } from '../../entities/order.entity';
import { OrderRepositoryContracts } from './../../contracts/order-repository.contracts';

export class OrderMemoryRepository implements OrderRepositoryContracts {
  orders: Order[] = [];
  create(data: CreateOrderDto): Promise<Order> {
    const entity = setBaseEntityValues();
    const order = new Order();
    Object.assign(order, { ...entity, ...data });

    this.orders.push(order);

    return Promise.resolve(order);
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
