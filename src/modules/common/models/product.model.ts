import { Product } from './../../products/entities/product.entity';
export class ProductModel extends Product {
  constructor(product: Product) {
    super();
    Object.assign(this, product);
  }
}
