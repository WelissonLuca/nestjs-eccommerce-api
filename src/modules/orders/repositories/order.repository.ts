import { Repository, EntityRepository } from 'typeorm';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../entities/order.entity';
import { OrderRepositoryContracts } from './../contracts/order-repository.contracts';

@EntityRepository(Order)
export class OrderRepository
  extends Repository<Order>
  implements OrderRepositoryContracts
{
  registerOrder(data: Omit<CreateOrderDto, 'zipCode'>): Promise<Order> {
    return this.save(data);
  }
  findAllByConsumerId(consumerId: string): Promise<Order[]> {
    return this.find({
      where: {
        consumerId: consumerId,
      },
      relations: ['products'],
    });
  }
  findOrderById(id: string): Promise<Order> {
    return this.findOne(id, {
      relations: ['products'],
    });
  }
}
