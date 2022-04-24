import { DefaultBaseEntity } from '../../common/base/entities/default-base-entity';

export class User extends DefaultBaseEntity {
  name: string;
  email: string;
  password: string;
}
