import { Controller, Inject } from '@nestjs/common';
import { OrderServiceContracts } from '../common/contracts/services/order-service.contracts';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('OrdersService')
    private readonly ordersService: OrderServiceContracts,
  ) {}
}
