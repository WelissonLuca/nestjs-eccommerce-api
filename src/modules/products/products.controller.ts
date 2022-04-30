import { ProductsServiceContracts } from './../common/contracts/services/products-service.contracts';
import { Body, Controller, Get, Inject, Param } from '@nestjs/common';
import { ProductModel } from '../common/models/product.model';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('ProductsService')
    private readonly productsService: ProductsServiceContracts,
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    const products = await this.productsService.findAll();

    return products.map((product) => new ProductModel(product));
  }

  @Get('/:categoryId')
  async findProductsByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Product[]> {
    const products = await this.productsService.findProductsByCategory(
      categoryId,
    );

    return products.map((product) => new ProductModel(product));
  }

  @Get('/:id')
  async findProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findProductById(id);

    return new ProductModel(product);
  }

  @Get('/ids')
  async findProductsByIds(@Body() ids: string[]): Promise<Product[]> {
    const products = await this.productsService.findProductsByIds(ids);

    return products.map((product) => new ProductModel(product));
  }
}
