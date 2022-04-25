import { ProductsServiceContracts } from './../common/contracts/services/products-service.contracts';
import { Controller, Inject } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('ProductsService')
    private readonly productsService: ProductsServiceContracts,
  ) {}
}
