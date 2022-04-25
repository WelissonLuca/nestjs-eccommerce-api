import { Product } from './../../../modules/products/entities/product.entity';
export class CreateFreightDto {
  destination: string;
  products: Product[];
}
