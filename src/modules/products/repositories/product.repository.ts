import { EntityRepository, Repository } from 'typeorm';
import { ProductRepositoryContracts } from '../contracts/product-repository.contract';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../entities/product.entity';

@EntityRepository(Product)
export class ProductRepository
  extends Repository<Product>
  implements ProductRepositoryContracts
{
  findProductsByIds(ids: string[]): Promise<Product[]> {
    return this.findByIds(ids);
  }
  findProductById(id: string): Promise<Product> {
    return this.findOne(id);
  }
  createProduct(data: CreateProductDto): Promise<Product> {
    return this.save(data);
  }
  findAll(): Promise<Product[]> {
    return this.find();
  }

  findByCategory(categoryId: string): Promise<Product[]> {
    return this.createQueryBuilder('product')
      .innerJoin('product.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .getMany();
  }
}
