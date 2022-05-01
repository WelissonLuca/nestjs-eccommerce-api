import { CreateOrderDto } from './dtos/create-order.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrderServiceContracts } from '../common/contracts/services/order-service.contracts';
import { OrderModel } from '../common/models/order.model';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('OrdersService')
    private readonly ordersService: OrderServiceContracts,
  ) {}

  @Post()
  async registerOrder(@Body() data: CreateOrderDto): Promise<OrderModel> {
    const order = await this.ordersService.registerOrder(data);

    return new OrderModel(order);
  }
}
