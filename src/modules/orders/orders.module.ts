import { ProductsModule } from './../products/products.module';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [ProductsModule],
  controllers: [OrdersController],
  providers: [
    {
      provide: 'OrdersService',
      useValue: OrdersService,
    },
    {
      provide: 'OrderRepository',
      useValue: {},
    },
  ],
})
export class OrdersModule {}
