import { CreateProductDto } from './../dtos/create-product.dto';
import { Product } from './../entities/product.entity';
export interface ProductRepositoryContracts {
  create(product: CreateProductDto): Promise<Product>;
  findAll(): Promise<Product[]>;
  findByCategory(categoryId: string): Promise<Product[]>;
  findProductById(id: string): Promise<Product>;
  findProductsByIds(ids: string[]): Promise<Product[]>;
}
