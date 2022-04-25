import { ProductRepository } from './repositories/product.repository';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsServiceContracts } from '../common/contracts/services/products-service.contracts';
import { ProductRepositoryContracts } from './contracts/product-repository.contract';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService implements ProductsServiceContracts {
  constructor(
    @InjectRepository(ProductRepository)
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

  async findProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new BadRequestException('No product found');
    }

    return product;
  }

  async findProductsByIds(ids: string[]): Promise<Product[]> {
    const products = await this.productRepository.findProductsByIds(ids);

    if (products.length === 0) {
      throw new BadRequestException('No products found');
    }

    return products;
  }
}
