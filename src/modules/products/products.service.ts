import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ProductRepositoryContracts } from './contracts/product-repository.contract';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepositoryContracts,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.findAll();

    if (products.length === 0) {
      throw new BadRequestException('No products found');
    }

    return products;
  }

  async findProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.productRepository.findByCategory(categoryId);

    if (products.length === 0) {
      throw new BadRequestException('No products found');
    }

    return products;
  }
}
