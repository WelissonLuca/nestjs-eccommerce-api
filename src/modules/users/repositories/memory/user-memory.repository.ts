import { UserRepositoryContracts } from '../../contracts/user-repository.contract';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { User } from '../../entities/user.entity';

export class UserMemoryRepository implements UserRepositoryContracts {
  private users: User[] = [];

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async updateUser(data: UpdateUserDto, email: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (user) {
      user.name = data.name;
      user.password = data.password;
    }
  }
}
