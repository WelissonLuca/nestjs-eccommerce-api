import { setBaseEntityValues } from '../../../../utils/set-base-entity-values';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { Order } from '../../entities/order.entity';
import { OrderRepositoryContracts } from './../../contracts/order-repository.contracts';

export class OrderMemoryRepository implements OrderRepositoryContracts {
  orders: Order[] = [];
  registerOrder(data: CreateOrderDto): Promise<Order> {
    const entity = setBaseEntityValues();
    const order = new Order();
    Object.assign(order, { ...entity, ...data });

    this.orders.push(order);

    return Promise.resolve(order);
  }
  findAllByConsumerId(consumerId: string): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
  findOrderById(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
}
