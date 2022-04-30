import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { DefaultBaseEntity } from '../../common/base/entities/default-base-entity';

@Entity('users')
export class User extends DefaultBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Exclude()
  password: string;
}
