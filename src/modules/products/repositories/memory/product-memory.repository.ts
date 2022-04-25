import { setBaseEntityValues } from './../../../../utils/set-base-entity-values';
import { Product } from '../../entities/product.entity';
import { ProductRepositoryContracts } from './../../contracts/product-repository.contract';

export class ProductMemoryRepository implements ProductRepositoryContracts {
  products: Product[] = [];

  async create(product: Product): Promise<Product> {
    const entity = setBaseEntityValues();
    Object.assign(product, { entity });
    this.products.push(product);
    return product;
  }

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  findByCategory(categoryId: string): Promise<Product[]> {
    return Promise.resolve(
      this.products.filter((product) => product.categoryId === categoryId),
    );
  }

  findProductById(id: string): Promise<Product> {
    return Promise.resolve(this.products.find((product) => product.id === id));
  }
}