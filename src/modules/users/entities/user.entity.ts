import { Entity } from 'typeorm';
import { DefaultBaseEntity } from '../../common/base/entities/default-base-entity';

@Entity('users')
export class User extends DefaultBaseEntity {
  name: string;
  email: string;
  password: string;
}
