import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultBaseEntity } from './../../common/base/entities/default-base-entity';
import { Product } from './product.entity';

@Entity('categories')
export class Category extends DefaultBaseEntity {
  @Column({
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  name: string;
  @Column({
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
