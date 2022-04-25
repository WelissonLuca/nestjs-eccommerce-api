import { DefaultBaseEntity } from '../../common/base/entities/default-base-entity';

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
