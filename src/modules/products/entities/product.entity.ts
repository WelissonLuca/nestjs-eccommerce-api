import { Category } from './categories.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultBaseEntity } from '../../common/base/entities/default-base-entity';

@Entity('products')
export class Product extends DefaultBaseEntity {
  @Column()
  name: string;
  @Column({
    type: 'text',
  })
  description: string;
  @Column()
  price: number;
  @Column()
  thumb: string;
  @Column({
    type: 'uuid',
    name: 'category_id',
  })
  categoryId: string;
  @Column()
  quantity: number;
  @Column({
    type: 'jsonb',
  })
  properties: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
