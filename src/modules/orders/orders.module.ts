import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './../products/products.module';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ProductsModule],
  controllers: [OrdersController],
  providers: [
    {
      provide: 'OrdersService',
      useValue: OrdersService,
    },
  ],
})
export class OrdersModule {}
