import { ProductRepository } from './repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'ProductsService',
      useValue: ProductsService,
    },
  ],
  exports: ['ProductsService'],
})
export class ProductsModule {}
