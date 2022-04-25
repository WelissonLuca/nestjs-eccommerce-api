import { Module } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [
    {
      provide: 'ProductsService',
      useValue: ProductsService,
    },
    ,
    {
      provide: 'ProductRepository',
      useValue: ProductRepository,
    },
  ],
  exports: ['ProductsService'],
})
export class ProductsModule {}
