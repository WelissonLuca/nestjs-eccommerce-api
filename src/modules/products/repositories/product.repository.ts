import { ProductRepositoryContracts } from '../contracts/product-repository.contract';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../entities/product.entity';

export class ProductRepository implements ProductRepositoryContracts {
  create(product: CreateProductDto): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
}
