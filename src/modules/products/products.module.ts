import { Module } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'ProductRepository',
      useValue: ProductRepository,
    },
  ],
})
export class ProductsModule {}
