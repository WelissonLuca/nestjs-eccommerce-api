import { Product } from '../../../products/entities/product.entity';

export interface ProductsServiceContracts {
  findAll(): Promise<Product[]>;
  findProductsByCategory(categoryId: string): Promise<Product[]>;
  findProductById(id: string): Promise<Product>;
  findProductsByIds(ids: string[]): Promise<Product[]>;
}
