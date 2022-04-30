import { User } from '../../users/entities/user.entity';

export class UserModel extends User {
  constructor(user: User) {
    super();
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
    this.isActive = user.isActive;
  }
}
