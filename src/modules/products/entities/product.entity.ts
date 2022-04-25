import { Entity } from 'typeorm';
import { DefaultBaseEntity } from '../../common/base/entities/default-base-entity';

@Entity('products')
export class Product extends DefaultBaseEntity {
  name: string;
  description: string;
  price: number;
  thumb: string;
  categoryId: string;
  quantity: number;
  properties: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };
}
